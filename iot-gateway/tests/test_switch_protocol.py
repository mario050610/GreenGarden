from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from switch_protocol import normalize_switch_state


def main() -> None:
    cases = [
        ('1', 'ON'),
        ('0', 'OFF'),
        ('ON', 'ON'),
        ('off', 'OFF'),
        (True, 'ON'),
        (False, 'OFF'),
        (1, 'ON'),
        (0, 'OFF'),
        ({'state': 'ON'}, 'ON'),
        ({'value': 0}, 'OFF'),
    ]
    for value, expected in cases:
        actual = normalize_switch_state(value)
        assert actual == expected, (value, actual, expected)
    assert normalize_switch_state('invalid') is None
    print('switch protocol tests: PASS')


if __name__ == '__main__':
    main()
