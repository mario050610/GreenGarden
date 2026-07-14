# GREEN GARDEN – Full-stack implementation

Bộ mã nguồn hiện thực hệ thống giám sát và điều chỉnh môi trường vườn thủy canh thông minh, được tổ chức tương tự dự án tham khảo GreenArgric nhưng đã đổi nghiệp vụ sang **GREEN GARDEN**.

## Thành phần

- `backend/`: Node.js + Express + JWT + MQTT + SQL Server, có chế độ dữ liệu bộ nhớ để chạy demo ngay.
- `frontend/`: React + TypeScript + Vite, gồm đủ các trang Login, Dashboard, Môi trường, Thiết bị, Cảnh báo, Lịch sử, Ngưỡng, Khu vực, Công việc và Người dùng.
- `simulator/`: giả lập cảm biến pH, EC, nhiệt độ, độ ẩm, ánh sáng và mực nước qua MQTT.
- `docker-compose.yml`: Mosquitto và SQL Server dùng cho môi trường local.

## Chạy nhanh không cần SQL Server/MQTT

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Mở terminal khác:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Truy cập `http://localhost:5173`.

Tài khoản demo:

- Email: `admin@greengarden.edu.vn`
- Mật khẩu: `demo123`

Backend mặc định chạy ở `DATA_MODE=memory`, phù hợp để demo UI và API ngay lập tức.

## Chạy cùng MQTT

```bash
docker compose up -d mosquitto
cd simulator
copy .env.example .env
npm install
npm start
```

Backend sẽ nhận dữ liệu từ topic `greengarden/area/<areaId>/sensor/<sensorCode>/data`.

## Chạy với SQL Server

1. Chạy SQL Server bằng Docker hoặc cài SQL Server local.
2. Chạy lần lượt:
   - `backend/database/GG-database.sql`
   - `backend/database/GG-data.sql`
3. Sửa `.env`:

```env
DATA_MODE=mssql
DB_SERVER=127.0.0.1
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=GreenGarden@123
DB_NAME=GreenGarden
```

> Mã nguồn hiện thực đầy đủ luồng demo bằng chế độ memory. SQL scripts được cung cấp đúng mô hình dữ liệu báo cáo và có thể dùng để thay thế lớp lưu trữ trong bước hoàn thiện triển khai.

## Ghép với UI Figma Make đã có

Nếu xuất code từ Figma Make, giữ lại các file sau từ thư mục `frontend/src` của bộ này:

- `lib/api.ts`
- `types.ts`
- `auth/AuthContext.tsx`
- các hàm gọi API trong từng trang

Sau đó thay JSX/CSS của từng trang bằng UI Figma của nhóm. Danh sách route và dữ liệu trả về đã được chuẩn hóa để khớp các màn hình GREEN GARDEN.
