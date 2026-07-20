from microbit import uart
import ujson


def send(payload):
    uart.write(ujson.dumps(payload) + '\n')


def receive():
    if not uart.any():
        return None
    line = uart.readline()
    if not line:
        return None
    try:
        return ujson.loads(line.decode('utf-8').strip())
    except (ValueError, UnicodeError):
        return None
