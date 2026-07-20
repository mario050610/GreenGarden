from microbit import pin8, pin12, pin13, pin16

from config import RELAY_ACTIVE_LOW

PINS = {
    'pump': pin8,
    'grow_light': pin12,
    'fan': pin16,
    'dosing_pump': pin13,
}

STATES = {
    'pump': 'OFF',
    'grow_light': 'OFF',
    'fan': 'OFF',
    'dosing_pump': 'OFF',
}


def output_value(state):
    on = state == 'ON'
    if RELAY_ACTIVE_LOW:
        return 0 if on else 1
    return 1 if on else 0


def initialize():
    for device in PINS:
        set_state(device, 'OFF')


def set_state(device, state):
    normalized = str(state).upper()
    if device not in PINS or normalized not in ('ON', 'OFF'):
        return False
    PINS[device].write_digital(output_value(normalized))
    STATES[device] = normalized
    return True


def get_state(device):
    return STATES.get(device, 'UNKNOWN')
