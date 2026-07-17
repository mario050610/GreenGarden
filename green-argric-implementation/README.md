# GREEN ARGRIC – Full-stack implementation

Bộ mã nguồn hiện thực **Hệ thống giám sát và điều chỉnh môi trường vườn thủy canh thông minh**. Repository được chuẩn bị để nhóm tiếp tục tích hợp UI Figma, hoàn thiện phần 11 và thu thập minh chứng cho phần 12 của báo cáo.

## Phạm vi MVP

Hệ thống giữ 10 trang chính:

- Đăng nhập
- Tổng quan
- Chỉ số môi trường
- Thiết bị
- Cảnh báo
- Lịch sử dữ liệu
- Cấu hình ngưỡng
- Khu vực trồng
- Công việc và bảo trì
- Quản lý người dùng

Các menu và route được giới hạn theo vai trò:

| Vai trò | Chức năng |
|---|---|
| Chủ vườn | Tổng quan, môi trường, thiết bị, cảnh báo, lịch sử, ngưỡng, khu vực |
| Kỹ thuật viên | Tổng quan, môi trường, thiết bị, cảnh báo, lịch sử, công việc và bảo trì |
| Quản trị viên | Tổng quan, thiết bị, cảnh báo, ngưỡng, khu vực, công việc và bảo trì, người dùng |

## Cấu trúc repository

```text
green-argric-implementation/
├── backend/       Node.js, Express, JWT, MQTT, SQL Server
├── frontend/      React, TypeScript, Vite
├── simulator/     Thiết bị giả lập gửi dữ liệu MQTT
├── infra/         Cấu hình Mosquitto
├── docs/          Hướng dẫn tích hợp Figma và tài liệu phần 12
└── docker-compose.yml
```

## Chạy nhanh bằng dữ liệu bộ nhớ

### Backend

```powershell
cd backend
copy .env.example .env
npm install
npm run dev
```

### Frontend

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

Truy cập: `http://localhost:5173`

## Tài khoản demo

Mật khẩu chung: `demo123`

| Vai trò | Email |
|---|---|
| Quản trị viên | `admin@greenargric.edu.vn` |
| Chủ vườn | `owner@greenargric.edu.vn` |
| Kỹ thuật viên | `tech@greenargric.edu.vn` |

Backend mặc định sử dụng:

```env
DATA_MODE=memory
```

Chế độ này phù hợp để ghép UI, kiểm thử API và chụp ảnh phần 12 mà chưa cần SQL Server.

## Chạy MQTT và simulator

```powershell
docker compose up -d mosquitto
```

Bật MQTT trong `backend/.env`:

```env
MQTT_ENABLED=true
MQTT_BROKER=mqtt://127.0.0.1:1883
MQTT_BASE_TOPIC=greenargric
```

Chạy thiết bị giả lập:

```powershell
cd simulator
copy .env.example .env
npm install
npm start
```

Topic dữ liệu cảm biến:

```text
greenargric/area/{areaId}/sensor/{sensorCode}/data
```

## Chạy với SQL Server

1. Khởi động SQL Server bằng Docker hoặc SQL Server local.
2. Chạy lần lượt:
   - `backend/database/GA-database.sql`
   - `backend/database/GA-data.sql`
3. Cập nhật `backend/.env`:

```env
DATA_MODE=mssql
DB_SERVER=127.0.0.1
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=GreenArgric@123
DB_NAME=GreenArgric
```

> Hiện tại các luồng demo hoàn chỉnh sử dụng chế độ memory. SQL scripts đã được chuẩn bị theo lược đồ báo cáo; nhóm Database tiếp tục hiện thực repository/query cho chế độ MSSQL.

## Swagger

Sau khi chạy Backend, mở:

```text
http://localhost:3000/api
```

## Ghép UI Figma

Giữ các phần logic sau khi thay JSX/CSS bằng giao diện Figma:

- `frontend/src/lib/api.ts`
- `frontend/src/types.ts`
- `frontend/src/auth/AuthContext.tsx`
- `frontend/src/components/RoleRoute.tsx`
- các hàm gọi API trong từng page

Xem thêm: `docs/FIGMA-INTEGRATION.md`.

## Phân công phần 12

Mẫu bàn giao và tên ảnh được đặt tại:

```text
docs/section-12/
```

Mỗi người làm trên nhánh riêng và không chỉnh trực tiếp file LaTeX chính. Xem `CONTRIBUTING.md` và `docs/section-12/README.md`.
