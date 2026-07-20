# Thiết lập Adafruit IO trước khi nối Micro:bit

Luồng chính theo kế hoạch môn học:

```text
Micro:bit/YOLO:BIT ↔ USB Serial ↔ Python IoT Gateway ↔ Adafruit IO
                                                ↕
                                      Backend + Database + Web
```

Python Gateway được giữ lại, không dùng phương án bỏ qua Gateway.

## Bước 1 – Tạo Feed

### Feed cảm biến

```text
ga-temperature
ga-humidity
ga-light
ga-water-level
ga-ph
ga-ec
```

`ga-ph` và `ga-ec` có thể mô phỏng cho đến khi nhóm có cảm biến thật.

### Feed điều khiển riêng cho từng thiết bị

```text
ga-pump-control
ga-light-control
ga-fan-control
ga-dosing-pump-control
```

### Feed phản hồi trạng thái

```text
ga-pump-status
ga-light-status
ga-fan-status
ga-dosing-pump-status
ga-gateway-status
```

Tổng cộng 15 feed. Giá trị điều khiển và trạng thái dùng quy ước:

```text
1 = ON
0 = OFF
```

## Bước 2 – Tạo Dashboard

Tạo dashboard `GREEN ARGRIC` và thêm:

- Line chart: nhiệt độ, độ ẩm, ánh sáng và mực nước.
- Gauge: nhiệt độ và mực nước.
- Bốn Toggle Button gắn lần lượt với các feed `*-control`.
- Bốn Indicator hoặc Text Block gắn với các feed `*-status`.
- Stream/Text cho `ga-gateway-status`.

Cấu hình Toggle Button:

```text
ON value: 1
OFF value: 0
```

Nhờ tách feed, người dùng không cần nhập JSON thủ công trên Dashboard.

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

1. Dữ liệu xuất hiện trên các biểu đồ Adafruit.
2. Khi đổi một Toggle `*-control`, Gateway nhận đúng lệnh ON/OFF.
3. Gateway cập nhật feed `*-status` tương ứng.

## Bước 4 – Kết nối Backend

Sao chép `backend/.env.example` thành `backend/.env`, đặt:

```env
MQTT_ENABLED=true
MQTT_PROVIDER=adafruit
AIO_USERNAME=...
AIO_KEY=...
```

Chạy Backend và đăng nhập tài khoản Admin hoặc Kỹ thuật viên để kiểm tra:

```text
GET http://localhost:3000/integration/status
```

Endpoint trả về danh sách feed điều khiển, feed trạng thái và trạng thái kết nối MQTT.

## Bước 5 – Kết nối Micro:bit thật

1. Nạp firmware trong thư mục `microbit/`.
2. Cắm Micro:bit/YOLO:BIT bằng cáp USB có truyền dữ liệu.
3. Cập nhật `SERIAL_PORT` trong `iot-gateway/.env` hoặc để Gateway tự dò.
4. Chạy `python main.py` không có `--simulate`.
5. Thử từng Toggle, xác nhận relay/LED/quạt/bơm phản hồi và feed trạng thái đổi theo.

## Bảo mật và giới hạn tốc độ

- Không commit AIO Key thật.
- Giữ `PUBLISH_INTERVAL_SECONDS=20` khi gửi sáu feed cảm biến.
- Backend đã subscribe topic `throttle` và `errors` để ghi log nếu Adafruit giới hạn tốc độ.
