# Luồng IoT và điều khiển tự động

## Chuỗi xử lý cần chứng minh

```text
Simulator gửi dữ liệu
→ MQTT Broker
→ Backend nhận dữ liệu
→ Lưu HydroponicReading
→ Kiểm tra ThresholdConfig
→ Tạo Alert
→ Automation gửi lệnh
→ Lưu DeviceCommand
→ Giao diện cập nhật
```

## Tình huống mô phỏng

1. Nhiệt độ cao → bật quạt
2. Ánh sáng thấp → bật đèn LED
3. EC thấp → bật bơm châm dinh dưỡng nếu thiết bị ở AUTO
4. Mực nước thấp → bật máy bơm cấp nước hoặc tuần hoàn

## Mẫu mô tả từng tình huống

### Tên tình huống

- **Giá trị cảm biến đầu vào:**
- **Ngưỡng cấu hình:**
- **MQTT topic:**
- **Payload:**
- **Xử lý của Backend:**
- **Lệnh đầu ra:**
- **Kết quả trên giao diện:**
- **Hình minh họa:**
- **Lỗi gặp phải:**

## Tên ảnh đề xuất

```text
12-iot-01-mosquitto-running.png
12-iot-02-simulator-publish.png
12-iot-03-backend-subscribe.png
12-iot-04-sensor-payload.png
12-iot-05-alert-created.png
12-iot-06-automation-command.png
12-iot-07-device-state.png
12-iot-08-dashboard-updated.png
```
