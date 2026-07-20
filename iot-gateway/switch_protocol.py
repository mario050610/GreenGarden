from __future__ import annotations

from typing import Any


def normalize_switch_state(payload: Any) -> str | None:
    """Chuẩn hóa payload Toggle Adafruit thành ON/OFF.

    Chấp nhận 1/0, ON/OFF, true/false hoặc object có state/status/value.
    """
    value = payload
    if isinstance(payload, dict):
        value = payload.get('state', payload.get('status', payload.get('value')))
    if isinstance(value, bool):
        return 'ON' if value else 'OFF'
    if isinstance(value, (int, float)):
        if value == 1:
            return 'ON'
        if value == 0:
            return 'OFF'
    normalized = str(value or '').strip().upper()
    if normalized in {'1', 'ON', 'TRUE', 'YES'}:
        return 'ON'
    if normalized in {'0', 'OFF', 'FALSE', 'NO'}:
        return 'OFF'
    return None
