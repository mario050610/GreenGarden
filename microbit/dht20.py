from microbit import i2c, sleep

DHT20_ADDRESS = 0x38


class DHT20:
    def __init__(self):
        self.available = False
        try:
            # Lệnh khởi tạo/calibration dùng cho họ AHT20/DHT20.
            i2c.write(DHT20_ADDRESS, bytes([0xBE, 0x08, 0x00]))
            sleep(10)
            self.available = True
        except OSError:
            self.available = False

    def read(self):
        if not self.available:
            return None, None
        try:
            i2c.write(DHT20_ADDRESS, bytes([0xAC, 0x33, 0x00]))
            sleep(85)
            data = i2c.read(DHT20_ADDRESS, 7)
            if len(data) < 6 or (data[0] & 0x80):
                return None, None
            raw_humidity = (data[1] << 12) | (data[2] << 4) | (data[3] >> 4)
            raw_temperature = ((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]
            humidity = raw_humidity * 100.0 / 1048576.0
            temperature = raw_temperature * 200.0 / 1048576.0 - 50.0
            return round(temperature, 2), round(humidity, 2)
        except OSError:
            return None, None
