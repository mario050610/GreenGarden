# Đặc tả tích hợp Adafruit IO – GREEN ARGRIC

Kiến trúc chính:

```text
Micro:bit/YOLO:BIT ↔ USB Serial ↔ Python IoT Gateway ↔ Adafruit IO
                                                        ↕
                                             Backend ↔ Database ↔ Frontend
```

Backend và Database có thể chạy local trong phiên bản nguyên mẫu; sau này có thể triển khai lên cloud mà không đổi giao thức thiết bị.

## Feed cảm biến

| Dữ liệu | Feed key mặc định | Giá trị |
|---|---|---|
| Nhiệt độ | `ga-temperature` | Số, °C |
| Độ ẩm | `ga-humidity` | Số, % |
| Ánh sáng | `ga-light` | Số, lux hoặc mức tương đối |
| Mực nước | `ga-water-level` | Số, % |
| pH | `ga-ph` | Số |
| EC | `ga-ec` | Số, mS/cm |

Full MQTT topic:

```text
{AIO_USERNAME}/feeds/{feed-key}
```

## Feed điều khiển thiết bị

| Thiết bị | Device key | Feed điều khiển |
|---|---|---|
| Bơm tuần hoàn | `pump` | `ga-pump-control` |
| Đèn trồng cây | `grow_light` | `ga-light-control` |
| Quạt thông gió | `fan` | `ga-fan-control` |
| Bơm dinh dưỡng | `dosing_pump` | `ga-dosing-pump-control` |

Payload chuẩn để tương thích Toggle Button:

```text
1 = ON
0 = OFF
```

Gateway cũng chấp nhận `ON/OFF`, `true/false` hoặc JSON có trường `state`, nhưng Dashboard và Backend mặc định publish `1/0`.

## Feed phản hồi trạng thái

| Thiết bị | Feed trạng thái |
|---|---|
| Bơm tuần hoàn | `ga-pump-status` |
| Đèn trồng cây | `ga-light-status` |
| Quạt thông gió | `ga-fan-status` |
| Bơm dinh dưỡng | `ga-dosing-pump-status` |

Gateway publish `1` khi thiết bị đang ON và `0` khi OFF. Backend dựa vào feed tương ứng để cập nhật đúng thiết bị và xác nhận lệnh gần nhất.

## Feed trạng thái Gateway

Feed: `ga-gateway-status`

```json
{
  "status": "online",
  "mode": "microbit",
  "serial": "COM3",
  "timestamp": "2026-07-20T08:00:00.000Z"
}
```

## Giao thức Serial

Gateway gửi xuống Micro:bit:

```json
{"type":"command","device":"fan","state":"ON","source":"adafruit-dashboard"}
```

Micro:bit phản hồi:

```json
{"type":"status","device":"fan","state":"ON","ok":true}
```

## MQTT local dự phòng

Mosquitto và simulator Node.js chỉ dùng khi chưa có tài khoản Adafruit hoặc phần cứng. Luồng nghiệm thu chính vẫn là Adafruit IO + Python Gateway + Micro:bit.
