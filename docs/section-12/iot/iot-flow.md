# Luồng IoT với Micro:bit, Python Gateway và Adafruit IO

## Chuỗi xử lý cần chứng minh

```text
Cảm biến
→ Micro:bit đọc dữ liệu
→ USB Serial
→ Python IoT Gateway
→ Adafruit IO feed
→ Backend subscribe
→ Lưu HydroponicReading
→ Kiểm tra ThresholdConfig
→ Tạo Alert
→ Backend publish ga-device-command
→ Gateway chuyển lệnh xuống Micro:bit
→ Micro:bit điều khiển relay
→ Gateway publish ga-device-status
→ Backend và giao diện cập nhật
```

## Các mốc kiểm thử

1. **Server trước:** Gateway `--simulate` gửi dữ liệu lên Adafruit Dashboard.
2. **Serial:** Micro:bit gửi JSON và Gateway đọc được.
3. **Cảm biến thật:** ít nhất nhiệt độ, ánh sáng và mực nước lên feed.
4. **Điều khiển:** Frontend/Backend bật quạt hoặc bơm qua Adafruit.
5. **Phản hồi:** trạng thái thật quay lại `ga-device-status`.
6. **Tự động:** nhiệt độ vượt ngưỡng → cảnh báo → bật quạt.

## Tên ảnh đề xuất

```text
12-iot-01-adafruit-feeds.png
12-iot-02-adafruit-dashboard.png
12-iot-03-gateway-simulate.png
12-iot-04-microbit-wiring.jpg
12-iot-05-microbit-serial.png
12-iot-06-backend-receive.png
12-iot-07-alert-created.png
12-iot-08-command-feed.png
12-iot-09-relay-device-on.jpg
12-iot-10-device-status.png
12-iot-11-dashboard-updated.png
```

## Nội dung phải ghi

- Feed key được sử dụng.
- Payload Serial và payload Adafruit.
- Chân Micro:bit và loại cảm biến/relay.
- Giá trị ngưỡng.
- Trạng thái thiết bị trước và sau lệnh.
- Lỗi thực tế và cách xử lý.
