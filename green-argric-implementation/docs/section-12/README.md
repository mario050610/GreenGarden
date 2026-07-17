# Phần 12 – Mô phỏng quy trình hệ thống

Phần 12 được chia thành bốn luồng độc lập. Mỗi thành viên chạy hệ thống, sửa lỗi thuộc luồng mình, chụp ảnh và điền nội dung Markdown theo mẫu có sẵn.

| Luồng | Thư mục | Nhánh đề xuất |
|---|---|---|
| Chủ vườn | `owner/` | `demo/owner-flow` |
| Quản trị viên | `admin/` | `demo/admin-flow` |
| Kỹ thuật viên | `technician/` | `demo/technician-flow` |
| IoT và tự động hóa | `iot/` | `demo/iot-automation` |

## Quy tắc bàn giao

Mỗi chức năng phải có:

1. Mục tiêu
2. Tiền điều kiện
3. Các bước thực hiện
4. Kết quả
5. API hoặc MQTT topic liên quan
6. Tên hình minh họa
7. Lỗi gặp phải và cách xử lý

Ảnh cần có cùng độ phân giải, không để lộ dữ liệu cá nhân và phải hiển thị tên **GREEN ARGRIC**.
