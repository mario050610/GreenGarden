# Phần 12 – Mô phỏng quy trình hệ thống

Phần 12 cần chứng minh cả **phần mềm** và **thiết bị thật**. Luồng IoT chính không còn là simulator → Mosquitto, mà là:

```text
Micro:bit ↔ Python Gateway ↔ Adafruit IO ↔ Backend ↔ Frontend/Database
```

| Luồng | Thư mục | Nhánh đề xuất |
|---|---|---|
| Chủ vườn | `owner/` | `demo/owner-flow` |
| Quản trị viên | `admin/` | `demo/admin-flow` |
| Kỹ thuật viên | `technician/` | `demo/technician-flow` |
| IoT và thiết bị thật | `iot/` | `demo/iot-microbit` |

Mỗi chức năng phải có mục tiêu, tiền điều kiện, bước thực hiện, kết quả, API/feed liên quan, hình minh họa và lỗi gặp phải. Ảnh không được để lộ AIO Key.
