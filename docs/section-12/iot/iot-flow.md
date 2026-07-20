# Luồng IoT – Adafruit IO, Python Gateway và Micro:bit

## Mục tiêu

Chứng minh hai chiều dữ liệu và điều khiển theo kiến trúc:

```text
Micro:bit → Serial → Python Gateway → Adafruit IO → Backend → Database/Web
Web hoặc Adafruit Dashboard → feed điều khiển → Gateway → Micro:bit → relay
```

## Luồng dữ liệu cảm biến

1. Micro:bit đọc DHT20, ánh sáng và mực nước.
2. Micro:bit gửi JSON qua USB Serial.
3. Python Gateway publish dữ liệu lên các feed cảm biến.
4. Backend subscribe, lưu dữ liệu và kiểm tra ngưỡng.
5. Frontend hiển thị dữ liệu và cảnh báo.

## Luồng điều khiển

1. Người dùng bật/tắt thiết bị trên Web hoặc Toggle Adafruit.
2. Giá trị `1/0` được publish vào feed riêng, ví dụ `ga-fan-control`.
3. Gateway ánh xạ feed thành thiết bị `fan` và gửi lệnh Serial.
4. Micro:bit bật/tắt relay hoặc thiết bị thật.
5. Micro:bit phản hồi trạng thái.
6. Gateway publish `1/0` vào `ga-fan-status`.
7. Backend và Frontend cập nhật trạng thái thực tế.

## Tình huống demo tối thiểu

```text
Nhiệt độ vượt ngưỡng
→ Backend tạo cảnh báo
→ Automation publish 1 vào ga-fan-control
→ Gateway gửi lệnh fan ON xuống Micro:bit
→ relay/quạt bật
→ Gateway publish 1 vào ga-fan-status
→ Web hiển thị quạt đang bật
```

## Minh chứng cần chụp

- Dashboard Adafruit có biểu đồ và Toggle.
- Terminal Gateway nhận feed điều khiển.
- Serial gửi lệnh đến Micro:bit.
- Relay hoặc LED thay đổi trạng thái.
- Feed trạng thái đổi từ 0 sang 1.
- Backend nhận dữ liệu và Frontend cập nhật.
