# Sơ đồ kết nối Micro:bit

Luồng phần cứng tối thiểu để nghiệm thu:

```text
DHT20 + cảm biến mực nước → Micro:bit → USB → Python Gateway
Python Gateway → Adafruit IO
Adafruit IO → Python Gateway → Micro:bit → relay → quạt/bơm
```

## Thiết bị tối thiểu đề xuất

- 01 Micro:bit V2 và cáp USB truyền dữ liệu.
- 01 DHT20.
- 01 cảm biến mực nước analog hoặc biến trở để mô phỏng.
- 01 module relay phù hợp mức logic.
- 01 quạt mini hoặc bơm mini điện áp thấp.
- Nguồn ngoài phù hợp cho tải.

## Trình tự tích hợp

1. Nạp firmware và kiểm tra Micro:bit gửi JSON qua serial.
2. Chạy Gateway, xác nhận dữ liệu lên Adafruit.
3. Thử lệnh bật LED tích hợp hoặc relay không tải.
4. Sau khi đúng logic mới nối quạt/bơm thật.
5. Chụp sơ đồ nối dây và ghi rõ chân trong báo cáo.

Pin thực tế có thể thay đổi theo shield/module của nhóm; cập nhật đồng thời `microbit/config.py` và tài liệu này.
