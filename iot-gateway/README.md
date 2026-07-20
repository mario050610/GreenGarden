# Python IoT Gateway

Gateway là phần bắt buộc trong kiến trúc môn học:

```text
Micro:bit ↔ USB Serial ↔ Python Gateway ↔ Adafruit IO
```

## 1. Kiểm thử server trước, chưa cần Micro:bit

```powershell
cd iot-gateway
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Điền `AIO_USERNAME` và `AIO_KEY`, sau đó:

```powershell
python main.py --simulate
```

Gateway sẽ gửi dữ liệu giả lên các feed cảm biến và subscribe feed `ga-device-command`. Đây là bước kiểm thử tuần 2–3.

## 2. Kết nối Micro:bit

1. Nạp các file trong thư mục `microbit/` lên Micro:bit.
2. Cắm Micro:bit vào máy tính bằng cáp USB có truyền dữ liệu.
3. Đặt `SERIAL_PORT=COMx` trong `.env`, hoặc để trống để tự dò.
4. Chạy:

```powershell
python main.py
```

## Giao thức Serial

Mỗi gói là một JSON trên một dòng.

Micro:bit gửi cảm biến:

```json
{"type":"sensor","area_id":1,"values":{"temperature":28.2,"humidity":70,"light":610,"water_level":68}}
```

Gateway gửi lệnh xuống Micro:bit:

```json
{"type":"command","request_id":"uuid","device":"fan","state":"ON"}
```

Micro:bit phản hồi:

```json
{"type":"status","request_id":"uuid","device":"fan","state":"ON","ok":true}
```

## Bảo mật

Không commit file `.env`. Không ghi AIO Key vào source code hoặc ảnh báo cáo.

## Giới hạn tốc độ

Mặc định Gateway chỉ đẩy một bộ dữ liệu mỗi 20 giây. Sáu feed cảm biến tương đương khoảng 18 lần publish/phút, chừa khoảng trống cho trạng thái và lệnh điều khiển trên tài khoản Adafruit IO miễn phí.
