# Kết nối Micro:bit/YOLO:BIT và thiết bị

Luồng phần cứng nghiệm thu:

```text
DHT20 + ánh sáng + mực nước → Micro:bit/YOLO:BIT → USB Serial → Python Gateway
Python Gateway → Adafruit IO
Adafruit IO → Python Gateway → Micro:bit/YOLO:BIT → relay → quạt/bơm/đèn
```

## Thiết bị tối thiểu

- Micro:bit V2 hoặc YOLO:BIT theo bộ môn học.
- Mạch mở rộng AIoT/YOLO:BIT nếu được cấp.
- DHT20.
- Cảm biến ánh sáng và cảm biến mực nước/biến trở mô phỏng.
- Relay điện áp thấp.
- Ít nhất một tải thử: LED, quạt mini hoặc bơm mini.
- Nguồn riêng phù hợp cho tải.

pH và EC/TDS có thể mô phỏng ở giai đoạn đầu nếu chưa có đầu dò thật.

## Trình tự tích hợp

1. Nạp firmware và kiểm tra JSON trên cổng Serial.
2. Chạy Gateway, xác nhận dữ liệu lên Adafruit.
3. Tạo Toggle `1/0` trên Adafruit cho từng thiết bị.
4. Thử LED/relay không tải trước.
5. Xác định relay active-high hay active-low và cập nhật `RELAY_ACTIVE_LOW`.
6. Chỉ sau khi đúng logic mới nối quạt/bơm thật bằng nguồn ngoài.
7. Chụp ảnh sơ đồ nối dây, tên khe cắm và chân thực tế để đưa vào báo cáo.

## Cấu hình cần xác nhận trên thiết bị thật

```text
DHT20: SCL/SDA thực tế
Cảm biến mực nước: cổng analog
Bơm tuần hoàn: cổng relay
Đèn: cổng relay
Quạt: cổng relay hoặc motor driver
Bơm dinh dưỡng: cổng relay
```

Không cấp nguồn quạt hoặc bơm trực tiếp từ GPIO. Cấu hình chân trong source là mẫu và phải được thành viên phần cứng cập nhật theo bộ thiết bị của nhóm.
