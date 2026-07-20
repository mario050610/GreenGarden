# Phân công code cho 4 thành viên

Bốn phần được thiết kế để ít đụng file của nhau nhất.

## Thành viên 1 – Adafruit IO và Python IoT Gateway

Nhánh: `feature/adafruit-gateway`

Phạm vi:

```text
iot-gateway/
docs/ADAFRUIT-SETUP.md
```

Kết quả cần bàn giao:

- Tạo feed và dashboard Adafruit.
- Chạy thành công `python main.py --simulate`.
- Gateway nhận lệnh `ga-device-command` và trả `ga-device-status`.
- Bổ sung ảnh log và hướng dẫn cấu hình, không commit AIO Key.

## Thành viên 2 – Firmware Micro:bit và cảm biến/relay

Nhánh: `feature/microbit-hardware`

Phạm vi:

```text
microbit/
docs/MICROBIT-WIRING.md
```

Kết quả cần bàn giao:

- Nạp firmware lên Micro:bit.
- Đọc tối thiểu nhiệt độ, ánh sáng và mực nước.
- Nhận lệnh Serial để bật/tắt ít nhất một relay hoặc LED thử nghiệm.
- Gửi phản hồi trạng thái về Gateway.
- Chụp ảnh mô hình và quay video ngắn.

## Thành viên 3 – Backend, Adafruit và Database

Nhánh: `feature/backend-adafruit`

Phạm vi:

```text
backend/
```

Kết quả cần bàn giao:

- Backend subscribe các feed cảm biến.
- Lưu dữ liệu, kiểm tra ngưỡng và tạo cảnh báo.
- Publish JSON lệnh vào `ga-device-command`.
- Nhận `ga-device-status` và cập nhật trạng thái.
- Hoàn thiện repository/query khi chuyển từ memory sang SQL Server.

## Thành viên 4 – Frontend và kiểm thử tích hợp

Nhánh: `feature/frontend-integration`

Phạm vi:

```text
frontend/
docs/section-12/
```

Kết quả cần bàn giao:

- Hiển thị dữ liệu cảm biến thật từ Backend.
- Điều khiển thiết bị và hiển thị trạng thái phản hồi.
- Thêm thông báo khi Gateway/MQTT chưa kết nối.
- Chạy các luồng Owner, Technician, Admin và chụp minh chứng phần 12.

## Quy tắc merge

1. Mỗi người pull `main` trước khi tạo nhánh.
2. Không commit `.env`, AIO Key hoặc mật khẩu Wi-Fi.
3. Merge Request/Pull Request phải ghi cách chạy và kết quả kiểm thử.
4. Merge theo thứ tự: Gateway → Micro:bit → Backend → Frontend/tích hợp.
5. Khi sửa giao thức JSON/feed key, phải cập nhật `backend/spec-iot.md` trước khi merge.
