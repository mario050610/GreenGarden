# GREEN ARGRIC Micro:bit / YOLO:BIT configuration

AREA_ID = 1
SAMPLE_INTERVAL_MS = 5000
UART_BAUD = 115200

# DHT20/AHT20 dùng I2C mặc định của Micro:bit: P19 (SCL), P20 (SDA).
USE_DHT20 = True

# Cảm biến analog. Cần đối chiếu lại đúng khe cắm trên mạch mở rộng YOLO:BIT của nhóm.
WATER_LEVEL_PIN = 1
SOIL_MOISTURE_PIN = 2
USE_SOIL_MOISTURE = False  # Không bắt buộc cho mô hình thủy canh; bật nếu nhóm có dùng.

# Relay/thiết bị. Dùng relay điện áp thấp; không nối tải trực tiếp vào GPIO.
# Nếu dùng shield AIoT/YOLO:BIT, nhóm phải cập nhật theo đúng chân/khe cắm thực tế.
DEVICE_PINS = {
    'pump': 8,
    'grow_light': 12,
    'fan': 16,
    'dosing_pump': 13,
}

# Nhiều module relay kích mức thấp. Đổi thành True nếu relay của nhóm là active-low.
RELAY_ACTIVE_LOW = False
