# Firmware Micro:bit – GREEN ARGRIC

## Chức năng

- Đọc DHT20 qua I2C nếu cảm biến được kết nối.
- Dùng cảm biến nhiệt độ tích hợp làm phương án dự phòng.
- Đọc ánh sáng từ ma trận LED của Micro:bit.
- Đọc mực nước qua chân analog P1.
- Đọc độ ẩm giá thể qua chân analog P2 để mở rộng.
- Điều khiển relay bơm, đèn, quạt và bơm dinh dưỡng.
- Giao tiếp với Python IoT Gateway qua USB Serial, JSON từng dòng.

## Nạp chương trình

Mở Python Editor của Micro:bit, tạo project mới và thêm toàn bộ các file:

```text
main.py
config.py
dht20.py
sensors.py
actuators.py
protocol.py
```

Sau đó tải file HEX và chép vào ổ `MICROBIT`.

## Sơ đồ chân mặc định

| Chức năng | Chân Micro:bit |
|---|---|
| DHT20 SDA | P20 |
| DHT20 SCL | P19 |
| Mực nước analog | P1 |
| Độ ẩm giá thể analog | P2 |
| Relay bơm | P8 |
| Relay đèn | P12 |
| Relay quạt | P16 |
| Relay bơm dinh dưỡng | P13 |

## Lưu ý an toàn

- Không cấp nguồn bơm, quạt hoặc đèn trực tiếp từ chân Micro:bit.
- Dùng relay/module driver và nguồn ngoài phù hợp.
- Nối chung GND giữa Micro:bit và module điều khiển khi thiết kế yêu cầu.
- Ưu tiên thiết bị điện áp thấp; không dùng tải 220 V trong mô hình sinh viên.
- Nếu relay kích mức thấp, đổi `RELAY_ACTIVE_LOW = True` trong `config.py`.
