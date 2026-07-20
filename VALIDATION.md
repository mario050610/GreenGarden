# Kết quả kiểm tra bản mã nguồn

Ngày kiểm tra: 2026-07-19

## Đã kiểm tra trong môi trường tạo mã nguồn

- Kiểm tra cú pháp toàn bộ JavaScript Backend và simulator.
- `frontend: npm run build` thành công.
- Backend khởi động ở `DATA_MODE=memory` và `MQTT_ENABLED=false`.
- `GET /health` trả về trạng thái thành công.
- Đăng nhập tài khoản Admin thành công.
- `GET /integration/status` thành công.
- Điều khiển thiết bị ở chế độ demo thành công khi MQTT chưa bật.
- Python IoT Gateway compile thành công.
- Thư viện `Adafruit_IO.MQTTClient` được kiểm tra có các hàm `connect`, `subscribe`, `publish` và `loop_background`.
- Parser lệnh `ga-device-command` và hàm publish feed đã được kiểm thử bằng MQTT client giả.
- Firmware Micro:bit compile cú pháp Python thành công.

## Chưa thể xác nhận trong môi trường tạo mã nguồn

- Kết nối thật đến tài khoản Adafruit IO vì không có AIO Username/Key của nhóm.
- Tên cổng COM thực tế của Micro:bit.
- Độ chính xác của DHT20, cảm biến mực nước và mức kích relay của phần cứng nhóm.
- Luồng thiết bị thật bật quạt/bơm vì không có phần cứng trong môi trường kiểm tra.

Nhóm cần thực hiện các bước trong `docs/ADAFRUIT-SETUP.md` và `docs/MICROBIT-WIRING.md` trước khi nghiệm thu.
