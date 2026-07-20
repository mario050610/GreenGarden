# Kết quả kiểm tra bản mã nguồn

Ngày kiểm tra: 2026-07-20

## Đã kiểm tra trong môi trường tạo mã nguồn

- Kiểm tra cú pháp JavaScript Backend và simulator.
- `frontend: npm run build` thành công.
- Backend khởi động ở `DATA_MODE=memory` và `MQTT_ENABLED=false`.
- `GET /health` và đăng nhập tài khoản Admin hoạt động.
- `GET /integration/status` trả về bản đồ feed điều khiển/trạng thái.
- Điều khiển thiết bị ở chế độ demo hoạt động khi MQTT chưa bật.
- Python IoT Gateway compile thành công.
- Bộ phân tích lệnh chấp nhận `1/0`, `ON/OFF`, boolean và JSON có `state`.
- Gateway subscribe 4 feed điều khiển riêng và publish 4 feed trạng thái riêng.
- Backend publish `1/0` vào feed điều khiển phù hợp theo thiết bị.
- Firmware Micro:bit compile cú pháp Python thành công.

## Chưa thể xác nhận trong môi trường tạo mã nguồn

- Kết nối thật đến tài khoản Adafruit IO vì không có AIO Username/Key của nhóm.
- Tên cổng COM thực tế của Micro:bit/YOLO:BIT.
- Đúng chân/khe cắm DHT20, cảm biến mực nước, relay trên bộ thiết bị của nhóm.
- Relay kích mức cao hay thấp.
- Luồng thiết bị thật bật quạt/bơm vì không có phần cứng trong môi trường kiểm tra.

Nhóm cần hoàn thành `docs/ADAFRUIT-SETUP.md` và `docs/MICROBIT-WIRING.md`, sau đó cập nhật lại file này bằng kết quả thiết bị thật trước nghiệm thu.
