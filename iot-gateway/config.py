from __future__ import annotations

import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


def _float(name: str, default: float) -> float:
    try:
        return float(os.getenv(name, default))
    except ValueError:
        return default


@dataclass(frozen=True)
class GatewayConfig:
    aio_username: str
    aio_key: str
    serial_port: str | None
    serial_baud: int
    serial_timeout: float
    area_id: int
    publish_interval_seconds: float
    sensor_feeds: dict[str, str]
    device_command_feed: str
    device_status_feed: str
    gateway_status_feed: str

    @classmethod
    def from_env(cls) -> 'GatewayConfig':
        username = os.getenv('AIO_USERNAME', '').strip()
        key = os.getenv('AIO_KEY', '').strip()
        if not username or not key:
            raise ValueError('Thiếu AIO_USERNAME hoặc AIO_KEY trong iot-gateway/.env')

        return cls(
            aio_username=username,
            aio_key=key,
            serial_port=os.getenv('SERIAL_PORT', '').strip() or None,
            serial_baud=int(os.getenv('SERIAL_BAUD', '115200')),
            serial_timeout=_float('SERIAL_TIMEOUT', 0.2),
            area_id=int(os.getenv('AREA_ID', '1')),
            publish_interval_seconds=_float('PUBLISH_INTERVAL_SECONDS', 20.0),
            sensor_feeds={
                'temperature': os.getenv('FEED_TEMPERATURE', 'ga-temperature'),
                'humidity': os.getenv('FEED_HUMIDITY', 'ga-humidity'),
                'light': os.getenv('FEED_LIGHT', 'ga-light'),
                'water_level': os.getenv('FEED_WATER_LEVEL', 'ga-water-level'),
                'ph': os.getenv('FEED_PH', 'ga-ph'),
                'ec': os.getenv('FEED_EC', 'ga-ec'),
            },
            device_command_feed=os.getenv('FEED_DEVICE_COMMAND', 'ga-device-command'),
            device_status_feed=os.getenv('FEED_DEVICE_STATUS', 'ga-device-status'),
            gateway_status_feed=os.getenv('FEED_GATEWAY_STATUS', 'ga-gateway-status'),
        )
