# Phân công code cho 4 thành viên

Bốn phần được chia để ít đụng file nhau và bám đúng kiến trúc hướng dẫn:

```text
Micro:bit/YOLO:BIT ↔ Python Gateway ↔ Adafruit IO ↔ Backend/Database ↔ Frontend
```

## Thành viên 1 – Adafruit IO và Python IoT Gateway

Nhánh: `feature/adafruit-gateway`

Phạm vi:

```text
iot-gateway/
docs/ADAFRUIT-SETUP.md
```

Kết quả cần bàn giao:

- Tạo đủ feed cảm biến, 4 feed điều khiển và 4 feed trạng thái.
- Tạo Dashboard có Toggle với `1=ON`, `0=OFF`.
- Chạy thành công `python main.py --simulate`.
- Gateway nhận đúng lệnh từ từng feed `*-control`.
- Gateway trả trạng thái vào đúng feed `*-status`.
- Chụp log và Dashboard; không commit AIO Key.

## Thành viên 2 – Firmware Micro:bit/YOLO:BIT và phần cứng

Nhánh: `feature/microbit-hardware`

Phạm vi:

```text
microbit/
docs/MICROBIT-WIRING.md
```

Kết quả cần bàn giao:

- Xác nhận chính xác loại board, mạch mở rộng và chân/khe cắm.
- Đọc tối thiểu nhiệt độ, ánh sáng và mực nước.
- Nhận lệnh Serial để bật/tắt ít nhất một relay hoặc LED thử nghiệm.
- Gửi phản hồi trạng thái về Gateway.
- Cập nhật `RELAY_ACTIVE_LOW` và pin theo thiết bị thật.
- Chụp ảnh mô hình, sơ đồ dây và quay video ngắn.

## Thành viên 3 – Backend, MQTT Adafruit và Database

Nhánh: `feature/backend-adafruit`

Phạm vi:

```text
backend/
```

Kết quả cần bàn giao:

- Backend subscribe các feed cảm biến.
- Lưu dữ liệu, kiểm tra ngưỡng và tạo cảnh báo.
- Publish `1/0` vào đúng feed điều khiển của từng thiết bị.
- Subscribe từng feed trạng thái và cập nhật đúng thiết bị.
- Hoàn thiện repository/query khi chuyển từ memory sang SQL Server.
- Kiểm tra `GET /integration/status` hiển thị đúng feed và MQTT.

## Thành viên 4 – Frontend và kiểm thử tích hợp

Nhánh: `feature/frontend-integration`

Phạm vi:

```text
frontend/
docs/section-12/
```

Kết quả cần bàn giao:

- Hiển thị dữ liệu cảm biến thật từ Backend.
- Điều khiển bơm, đèn, quạt và hiển thị trạng thái phản hồi.
- Thêm thông báo khi Gateway/MQTT chưa kết nối.
- Chạy các luồng Owner, Technician, Admin.
- Chụp minh chứng phần 12 theo luồng thiết bị thật.

## Quy tắc merge

1. Mỗi người pull `main` trước khi tạo nhánh.
2. Không commit `.env`, AIO Key hoặc mật khẩu Wi-Fi.
3. Merge Request phải ghi cách chạy, ảnh kết quả và phần chưa kiểm tra được.
4. Merge theo thứ tự: Gateway → Micro:bit → Backend → Frontend/tích hợp.
5. Khi đổi feed hoặc giao thức Serial, cập nhật `backend/spec-iot.md` trước khi merge.
6. Không tự ý bỏ Python Gateway vì đây là phần được yêu cầu trong kế hoạch môn học.
