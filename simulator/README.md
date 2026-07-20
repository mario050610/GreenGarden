# MQTT local simulator (dự phòng)

Thư mục này chỉ phục vụ kiểm thử với Mosquitto local khi chưa có Internet hoặc Adafruit IO. Luồng chính của môn học nằm trong `iot-gateway/` và `microbit/`.

Chạy broker local:

```powershell
docker compose --profile local-mqtt up -d mosquitto
```

Sau đó cấu hình Backend:

```env
MQTT_ENABLED=true
MQTT_PROVIDER=local
```
