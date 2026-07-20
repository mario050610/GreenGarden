# Thiết lập Adafruit IO trước khi nối Micro:bit

## Bước 1 – Tạo feed

Tạo đúng các feed key sau:

```text
ga-temperature
ga-humidity
ga-light
ga-water-level
ga-ph
ga-ec
ga-device-command
ga-device-status
ga-gateway-status
```

Các feed pH và EC có thể để trống cho đến khi nhóm có cảm biến thật hoặc quyết định mô phỏng.

## Bước 2 – Tạo Dashboard

Tạo dashboard `GREEN ARGRIC` và thêm:

- Line chart: nhiệt độ, độ ẩm, ánh sáng và mực nước.
- Gauge: nhiệt độ và mực nước.
- Stream/Text: trạng thái Gateway và trạng thái thiết bị.
- Text input cho `ga-device-command` nếu muốn thử lệnh JSON trực tiếp.

Lệnh thử:

```json
{"type":"command","request_id":"manual-01","device":"fan","state":"ON"}
```

## Bước 3 – Chạy Gateway giả lập

```powershell
cd iot-gateway
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python main.py --simulate
```

Kết quả cần thấy:

1. Dữ liệu xuất hiện trên dashboard Adafruit.
2. Gateway nhận lệnh từ feed `ga-device-command`.
3. Gateway ghi trạng thái giả vào `ga-device-status`.

## Bước 4 – Kết nối Backend

Sao chép `backend/.env.example` thành `backend/.env`, đặt:

```env
MQTT_ENABLED=true
MQTT_PROVIDER=adafruit
AIO_USERNAME=...
AIO_KEY=...
```

Chạy Backend và kiểm tra:

```text
GET http://localhost:3000/health
```

Không để lộ AIO Key trong commit, ảnh chụp hoặc video.

## Giới hạn tốc độ Adafruit IO

Giữ `PUBLISH_INTERVAL_SECONDS=20` khi gửi đồng thời sáu feed. Không giảm tùy ý vì tổng số lần publish của mọi client dùng chung tài khoản đều được tính vào giới hạn. Backend đã subscribe topic `throttle` và `errors` để ghi log khi bị giới hạn.
