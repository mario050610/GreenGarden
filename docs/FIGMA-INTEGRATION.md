# Ghép backend với UI Figma Make

1. Trong Figma Make, mở code/export project React.
2. Copy các file `frontend/src/lib/api.ts`, `frontend/src/types.ts` và `frontend/src/auth/AuthContext.tsx` vào source UI.
3. Bọc ứng dụng bằng `AuthProvider`.
4. Thay dữ liệu hard-code của từng màn hình bằng API:

| Màn hình | API |
|---|---|
| Đăng nhập | `POST /auth/login` |
| Tổng quan | `GET /dashboard` |
| Môi trường | `GET /sensor/area/:areaId/latest` |
| Biểu đồ lịch sử | `GET /sensor/area/:areaId/history/:type` |
| Thiết bị | `GET /device`, `POST /device/override` |
| Cảnh báo | `GET /alert`, `POST /alert/:id/resolve` |
| Ngưỡng | `GET /threshold/:areaId`, `POST /threshold` |
| Khu vực | `GET/POST/PUT/DELETE /area` |
| Công việc | `GET/POST /task`, `PUT /task/:id/status` |
| Người dùng | `GET/POST/PUT /user`, `POST /user/:id/toggle` |

Frontend mẫu trong bộ mã nguồn đã gọi sẵn tất cả API trên. Bạn có thể giữ logic và thay phần JSX bằng giao diện Figma.
