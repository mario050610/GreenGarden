# Quy trình làm việc nhóm

## Nhánh đề xuất

```text
feature/frontend-figma
demo/owner-flow
demo/admin-flow
demo/technician-flow
demo/iot-automation
feature/database-mssql
feature/backend-api
```

Không push trực tiếp lên `main`. Mỗi thành viên tạo Pull Request và ghi rõ:

- Nội dung đã làm
- File đã thay đổi
- Cách chạy kiểm thử
- Ảnh kết quả
- Chức năng còn thiếu hoặc lỗi đã biết

## Quy ước commit

```text
feat: thêm chức năng mới
fix: sửa lỗi
ui: chỉnh giao diện
api: chỉnh backend API
db: chỉnh database
iot: chỉnh MQTT hoặc simulator
docs: cập nhật tài liệu
```

Ví dụ:

```bash
git add .
git commit -m "ui: tích hợp giao diện Figma cho luồng chủ vườn"
git push origin demo/owner-flow
```

## Phạm vi file

- Frontend/UI: `frontend/`
- Backend/API: `backend/routes/`, `backend/middleware/`, `backend/config/`
- Database: `backend/database/`, `backend/db.js`, repository/query được bổ sung
- IoT/MQTT: `backend/mqtt.js`, `backend/core/automation.js`, `simulator/`, `infra/`
- Nội dung phần 12: `docs/section-12/`
