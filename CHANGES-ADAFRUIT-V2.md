# Thay đổi bản Adafruit V2

Bản này được chỉnh để khớp hơn với sơ đồ hướng dẫn môn học:

- Giữ kiến trúc `Micro:bit/YOLO:BIT ↔ Serial ↔ Python Gateway ↔ Adafruit IO`.
- Tách một feed điều khiển và một feed trạng thái cho từng thiết bị.
- Dashboard dùng Toggle trực tiếp với `1=ON`, `0=OFF`, không cần nhập JSON.
- Gateway chấp nhận `1/0`, `ON/OFF`, boolean và JSON có trường `state`.
- Backend publish đúng feed theo thiết bị và subscribe từng feed trạng thái.
- Bổ sung hướng dẫn phần cứng, lưu ý chân/khe cắm phải kiểm tra trên bộ YOLO:BIT thật.
- Ghi rõ Backend/Database có thể chạy local trong bản nguyên mẫu.
- Không thêm AI Inference vì không nằm trong phạm vi chức năng hiện tại.
- Bổ sung kiểm thử giao thức Toggle trong GitLab CI.
