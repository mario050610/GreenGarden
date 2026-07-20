from __future__ import annotations

import argparse
import random
import signal
import sys
import time
from datetime import datetime, timezone
from typing import Any

from adafruit_client import AdafruitBridge
from config import GatewayConfig
from serial_gateway import MicrobitSerial

RUNNING = True


def iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def stop_handler(_signum: int, _frame: Any) -> None:
    global RUNNING
    RUNNING = False


def simulated_packet() -> dict[str, Any]:
    return {
        'type': 'sensor',
        'area_id': 1,
        'values': {
            'temperature': round(28 + random.uniform(-1.2, 1.2), 2),
            'humidity': round(72 + random.uniform(-4, 4), 2),
            'light': round(680 + random.uniform(-80, 80), 2),
            'water_level': round(72 + random.uniform(-5, 5), 2),
            'ph': round(6.3 + random.uniform(-0.2, 0.2), 2),
            'ec': round(1.9 + random.uniform(-0.15, 0.15), 2),
        },
    }


def publish_sensor_packet(adafruit: AdafruitBridge, packet: dict[str, Any]) -> None:
    values = packet.get('values')
    if not isinstance(values, dict):
        sensor_type = packet.get('sensor') or packet.get('sensor_type')
        if sensor_type:
            values = {str(sensor_type): packet.get('value')}
        else:
            return
    for sensor_type, value in values.items():
        adafruit.publish_sensor(str(sensor_type), value)
    print('[gateway] Published sensor values:', values)


def run(simulate: bool) -> int:
    config = GatewayConfig.from_env()
    adafruit = AdafruitBridge(config)
    serial_link = None if simulate else MicrobitSerial(
        port=config.serial_port,
        baud=config.serial_baud,
        timeout=config.serial_timeout,
    )

    adafruit.connect()
    if serial_link:
        serial_link.connect()

    adafruit.publish_json(config.gateway_status_feed, {
        'status': 'online',
        'mode': 'simulate' if simulate else 'microbit',
        'serial': serial_link.port if serial_link else None,
        'timestamp': iso_now(),
    })

    last_sensor_publish = 0.0
    pending_sensor_packet = None
    while RUNNING:
        command = adafruit.next_command()
        while command:
            if serial_link:
                serial_link.write_json(command)
                print('[gateway] Command sent to Micro:bit:', command)
            else:
                # Chế độ tuần 3: xác nhận giả để kiểm thử Adafruit ↔ Gateway ↔ Backend.
                if adafruit.connected:
                    adafruit.publish_json(config.device_status_feed, {
                        'type': 'status',
                        'request_id': command.get('request_id'),
                        'device': command.get('device'),
                        'state': command.get('state'),
                        'ok': True,
                        'simulated': True,
                        'timestamp': iso_now(),
                    })
                    print('[gateway] Simulated device status:', command)
                else:
                    print('[gateway] Adafruit disconnected; command acknowledgement skipped')
            command = adafruit.next_command()

        if serial_link:
            packet = serial_link.read_json()
            if packet:
                packet_type = packet.get('type')
                if packet_type == 'sensor':
                    pending_sensor_packet = packet
                elif packet_type == 'status':
                    packet.setdefault('timestamp', iso_now())
                    if adafruit.connected:
                        adafruit.publish_json(config.device_status_feed, packet)
                        print('[gateway] Device status published:', packet)
                    else:
                        print('[gateway] Adafruit disconnected; device status not published')
                elif packet_type == 'heartbeat':
                    packet.setdefault('timestamp', iso_now())
                    if adafruit.connected:
                        adafruit.publish_json(config.gateway_status_feed, packet)
        elif time.monotonic() - last_sensor_publish >= config.publish_interval_seconds:
            pending_sensor_packet = simulated_packet()

        if (pending_sensor_packet and adafruit.connected
                and time.monotonic() - last_sensor_publish >= config.publish_interval_seconds):
            publish_sensor_packet(adafruit, pending_sensor_packet)
            pending_sensor_packet = None
            last_sensor_publish = time.monotonic()

        time.sleep(0.05)

    if adafruit.connected:
        adafruit.publish_json(config.gateway_status_feed, {
            'status': 'offline',
            'timestamp': iso_now(),
        })
    if serial_link:
        serial_link.close()
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description='GREEN ARGRIC Python IoT Gateway')
    parser.add_argument(
        '--simulate',
        action='store_true',
        help='Gửi dữ liệu giả lên Adafruit IO mà không cần Micro:bit',
    )
    args = parser.parse_args()
    signal.signal(signal.SIGINT, stop_handler)
    signal.signal(signal.SIGTERM, stop_handler)
    try:
        return run(args.simulate)
    except (ValueError, RuntimeError) as error:
        print(f'[gateway] {error}', file=sys.stderr)
        return 2
    except KeyboardInterrupt:
        return 0


if __name__ == '__main__':
    raise SystemExit(main())
