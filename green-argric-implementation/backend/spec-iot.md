# Đặc tả MQTT – GREEN ARGRIC

## Sensor data

Topic:

```text
greenargric/area/{areaId}/sensor/{sensorCode}/data
```

Payload:

```json
{
  "value": 6.2,
  "unit": "pH",
  "timestamp": "2026-07-14T08:00:00.000Z",
  "quality": "good"
}
```

Sensor types: `temperature`, `humidity`, `ph`, `ec`, `light`, `water_level`.

## Device command

Topic:

```text
greenargric/area/{areaId}/device/{deviceCode}/set
```

Payload:

```json
{
  "state": "ON",
  "timestamp": "2026-07-14T08:00:00.000Z"
}
```

## Device status

Topic:

```text
greenargric/area/{areaId}/device/{deviceCode}/status
```
