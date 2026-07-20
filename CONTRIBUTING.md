# Quy trình làm việc nhóm

## Nhánh code đề xuất

```text
feature/adafruit-gateway
feature/microbit-hardware
feature/backend-adafruit
feature/frontend-integration
feature/database-mssql
demo/owner-flow
demo/admin-flow
demo/technician-flow
demo/iot-microbit
```

Không push trực tiếp lên `main`. Mỗi Merge Request/Pull Request ghi rõ:

- Nội dung và file đã thay đổi.
- Cách chạy kiểm thử.
- Feed/API/giao thức liên quan.
- Ảnh hoặc video kết quả.
- Chức năng còn thiếu và lỗi đã biết.

## Quy ước commit

```text
feat: thêm chức năng
fix: sửa lỗi
ui: chỉnh giao diện
api: chỉnh backend API
db: chỉnh database
iot: chỉnh Gateway, Adafruit hoặc Micro:bit
docs: cập nhật tài liệu
```


## Phạm vi file

- Adafruit/Gateway: `iot-gateway/`
- Micro:bit/phần cứng: `microbit/`
- Backend/API/Database: `backend/`
- Frontend: `frontend/`
- Minh chứng báo cáo: `docs/section-12/`

Xem phân công chi tiết tại `docs/WORK-DIVISION-4-DEVELOPERS.md`.
