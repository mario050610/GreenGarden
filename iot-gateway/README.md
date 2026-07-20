# Python IoT Gateway

Gateway là thành phần bắt buộc:

```text
Micro:bit/YOLO:BIT ↔ USB Serial ↔ Python Gateway ↔ Adafruit IO
```

## 1. Kiểm thử server trước, chưa cần Micro:bit

```powershell
cd iot-gateway
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python main.py --simulate
```

Gateway gửi dữ liệu giả lên feed cảm biến và subscribe bốn feed điều khiển:

```text
ga-pump-control
ga-light-control
ga-fan-control
ga-dosing-pump-control
```

Mỗi feed chấp nhận `1/0`, `ON/OFF`, `true/false` hoặc JSON có trường `state`. Trạng thái được trả về feed riêng tương ứng.

## 2. Kết nối Micro:bit

1. Nạp các file trong thư mục `microbit/` lên Micro:bit.
2. Cắm cáp USB có truyền dữ liệu.
3. Đặt `SERIAL_PORT=COMx` trong `.env`, hoặc để trống để tự dò.
4. Chạy:

```powershell
python main.py
```

## Giao thức Serial

Micro:bit gửi cảm biến:

```json
{"type":"sensor","area_id":1,"values":{"temperature":28.2,"humidity":70,"light":610,"water_level":68}}
```

Gateway gửi lệnh:

```json
{"type":"command","device":"fan","state":"ON","source":"adafruit-dashboard"}
```

Micro:bit phản hồi:

```json
{"type":"status","device":"fan","state":"ON","ok":true}
```

## Lưu ý phần cứng

Các chân trong `microbit/config.py` chỉ là cấu hình ban đầu. Khi nhận bộ YOLO:BIT/AIoT thật, phải đối chiếu đúng khe cắm, mức kích relay và nguồn ngoài rồi cập nhật lại.

## Bảo mật và tốc độ

Không commit `.env` hoặc AIO Key. Mặc định sáu feed cảm biến được cập nhật mỗi 20 giây để chừa lưu lượng cho lệnh và trạng thái thiết bị.
