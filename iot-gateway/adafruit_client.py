from __future__ import annotations

import json
import queue
import time
from typing import Any

from Adafruit_IO import MQTTClient

from config import GatewayConfig


class AdafruitBridge:
    def __init__(self, config: GatewayConfig) -> None:
        self.config = config
        self.commands: queue.Queue[dict[str, Any]] = queue.Queue()
        self.connected = False
        self.client = MQTTClient(config.aio_username, config.aio_key)
        self.client.on_connect = self._on_connect
        self.client.on_disconnect = self._on_disconnect
        self.client.on_message = self._on_message

    def _on_connect(self, client: MQTTClient) -> None:
        self.connected = True
        client.subscribe(self.config.device_command_feed)
        print(f'[adafruit] Connected; subscribed to {self.config.device_command_feed}')

    def _on_disconnect(self, _client: MQTTClient) -> None:
        self.connected = False
        print('[adafruit] Disconnected')

    def _on_message(self, _client: MQTTClient, feed_id: str, payload: str) -> None:
        if feed_id != self.config.device_command_feed:
            return
        try:
            command = json.loads(payload)
        except json.JSONDecodeError:
            print(f'[adafruit] Invalid command JSON: {payload}')
            return
        if not isinstance(command, dict):
            return
        device = str(command.get('device', '')).strip()
        state = str(command.get('state', '')).upper()
        if not device or state not in {'ON', 'OFF'}:
            print(f'[adafruit] Invalid command content: {command}')
            return
        command['type'] = 'command'
        command['state'] = state
        self.commands.put(command)
        print(f'[adafruit] Command queued: {device} -> {state}')

    def connect(self, timeout_seconds: float = 15.0) -> None:
        self.client.connect()
        self.client.loop_background()
        deadline = time.monotonic() + timeout_seconds
        while not self.connected and time.monotonic() < deadline:
            time.sleep(0.05)
        if not self.connected:
            raise RuntimeError('Không kết nối được Adafruit IO trong thời gian cho phép')

    def _ensure_connected(self) -> None:
        if not self.connected:
            raise RuntimeError('Adafruit IO chưa kết nối')

    def publish_sensor(self, sensor_type: str, value: Any) -> None:
        feed = self.config.sensor_feeds.get(sensor_type)
        if not feed or value is None:
            return
        try:
            numeric = float(value)
        except (TypeError, ValueError):
            print(f'[adafruit] Skip invalid {sensor_type}: {value}')
            return
        self._ensure_connected()
        self.client.publish(feed, numeric)

    def publish_json(self, feed: str, payload: dict[str, Any]) -> None:
        self._ensure_connected()
        self.client.publish(feed, json.dumps(payload, separators=(',', ':')))

    def next_command(self) -> dict[str, Any] | None:
        try:
            return self.commands.get_nowait()
        except queue.Empty:
            return None
