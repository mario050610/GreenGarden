# Đặc tả tích hợp Adafruit IO – GREEN ARGRIC

Kiến trúc chính của môn học:

```text
Micro:bit ↔ USB Serial ↔ Python IoT Gateway ↔ Adafruit IO ↔ Backend ↔ Frontend/Database
```

## Feed cảm biến

| Dữ liệu | Feed key mặc định | Giá trị |
|---|---|---|
| Nhiệt độ | `ga-temperature` | Số, đơn vị °C |
| Độ ẩm | `ga-humidity` | Số, đơn vị % |
| Ánh sáng | `ga-light` | Số, đơn vị lux |
| Mực nước | `ga-water-level` | Số, đơn vị % |
| pH | `ga-ph` | Số |
| EC | `ga-ec` | Số, đơn vị mS/cm |

Full MQTT topic có dạng:

```text
{AIO_USERNAME}/feeds/{feed-key}
```

## Feed lệnh thiết bị

Feed: `ga-device-command`

```json
{
  "type": "command",
  "request_id": "uuid",
  "device": "fan",
  "state": "ON",
  "source": "backend",
  "timestamp": "2026-07-19T08:00:00.000Z"
}
```

`device` nhận một trong các giá trị: `fan`, `pump`, `grow_light`, `dosing_pump`.

## Feed trạng thái thiết bị

Feed: `ga-device-status`

```json
{
  "type": "status",
  "request_id": "uuid",
  "device": "fan",
  "state": "ON",
  "ok": true,
  "timestamp": "2026-07-19T08:00:02.000Z"
}
```

## Feed trạng thái Gateway

Feed: `ga-gateway-status`

```json
{
  "status": "online",
  "serial": "COM3",
  "timestamp": "2026-07-19T08:00:00.000Z"
}
```

## MQTT local dự phòng

Mosquitto và simulator Node.js vẫn được giữ để kiểm thử khi chưa có tài khoản Adafruit hoặc chưa cắm Micro:bit. Đây không phải luồng chính dùng để nghiệm thu môn học.
