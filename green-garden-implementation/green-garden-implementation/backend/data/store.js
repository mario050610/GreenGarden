const now = Date.now();
const iso = (offsetMinutes = 0) => new Date(now + offsetMinutes * 60_000).toISOString();

export const store = {
  roles: [
    { role_id: 1, role_name: 'admin' },
    { role_id: 2, role_name: 'owner' },
    { role_id: 3, role_name: 'technician' },
  ],
  users: [
    { user_id: 1, role_id: 1, full_name: 'Nguyễn Văn An', email: 'admin@greengarden.edu.vn', password_hash: 'plain:demo123', status: 'active' },
    { user_id: 2, role_id: 2, full_name: 'Trần Minh Khoa', email: 'owner@greengarden.edu.vn', password_hash: 'plain:demo123', status: 'active' },
    { user_id: 3, role_id: 3, full_name: 'Lê Thu Hà', email: 'tech@greengarden.edu.vn', password_hash: 'plain:demo123', status: 'active' },
  ],
  areas: [
    { area_id: 1, area_name: 'Khu A', location: 'Nhà màng phía Đông', crop_type: 'Rau muống', description: 'Khu trồng rau ăn lá', status: 'active' },
    { area_id: 2, area_name: 'Khu B', location: 'Nhà màng trung tâm', crop_type: 'Xà lách xanh', description: 'Khu trồng xà lách', status: 'active' },
    { area_id: 3, area_name: 'Khu C', location: 'Nhà màng phía Tây', crop_type: 'Cải bó xôi', description: 'Khu thử nghiệm', status: 'maintenance' },
  ],
  sensors: [
    ['TEMP-A1','temperature','°C'],['HUM-A1','humidity','%'],['PH-A1','ph','pH'],['EC-A1','ec','mS/cm'],['LIGHT-A1','light','lux'],['WATER-A1','water_level','%'],
    ['TEMP-B1','temperature','°C'],['PH-B1','ph','pH'],['EC-B1','ec','mS/cm'],['WATER-B1','water_level','%'],
  ].map((s, i) => ({ sensor_id: i+1, area_id: i < 6 ? 1 : 2, sensor_code: s[0], sensor_type: s[1], unit: s[2], mqtt_topic: `greengarden/area/${i < 6 ? 1 : 2}/sensor/${s[0]}/data`, status: 'online', last_seen: iso(-2) })),
  readings: [],
  devices: [
    { device_id: 1, area_id: 1, device_code: 'PUMP-CIRC-A', device_name: 'Máy bơm tuần hoàn A', device_type: 'circulation_pump', status: 'ON', mode: 'AUTO', command_topic: 'greengarden/area/1/device/PUMP-CIRC-A/set', status_topic: 'greengarden/area/1/device/PUMP-CIRC-A/status', last_seen: iso(-1) },
    { device_id: 2, area_id: 1, device_code: 'LED-A', device_name: 'Đèn LED A', device_type: 'grow_light', status: 'OFF', mode: 'AUTO', command_topic: 'greengarden/area/1/device/LED-A/set', status_topic: 'greengarden/area/1/device/LED-A/status', last_seen: iso(-1) },
    { device_id: 3, area_id: 1, device_code: 'FAN-A', device_name: 'Quạt thông gió A', device_type: 'fan', status: 'ON', mode: 'AUTO', command_topic: 'greengarden/area/1/device/FAN-A/set', status_topic: 'greengarden/area/1/device/FAN-A/status', last_seen: iso(-1) },
    { device_id: 4, area_id: 1, device_code: 'DOSING-A', device_name: 'Bơm châm dinh dưỡng A', device_type: 'dosing_pump', status: 'OFF', mode: 'MANUAL', command_topic: 'greengarden/area/1/device/DOSING-A/set', status_topic: 'greengarden/area/1/device/DOSING-A/status', last_seen: iso(-1) },
  ],
  thresholds: [
    { threshold_id: 1, area_id: 1, sensor_type: 'temperature', min_value: 22, max_value: 30, warning_level: 'medium', is_activated: true },
    { threshold_id: 2, area_id: 1, sensor_type: 'humidity', min_value: 60, max_value: 85, warning_level: 'low', is_activated: true },
    { threshold_id: 3, area_id: 1, sensor_type: 'ph', min_value: 5.8, max_value: 6.5, warning_level: 'high', is_activated: true },
    { threshold_id: 4, area_id: 1, sensor_type: 'ec', min_value: 1.2, max_value: 2.2, warning_level: 'high', is_activated: true },
    { threshold_id: 5, area_id: 1, sensor_type: 'water_level', min_value: 40, max_value: 100, warning_level: 'high', is_activated: true },
    { threshold_id: 6, area_id: 1, sensor_type: 'light', min_value: 500, max_value: 1200, warning_level: 'low', is_activated: true },
  ],
  alerts: [
    { alert_id: 1, area_id: 1, sensor_type: 'ph', title: 'pH vượt ngưỡng trên', message: 'pH hiện tại 7.1, ngưỡng tối đa 6.5', severity: 'high', status: 'open', created_at: iso(-120) },
    { alert_id: 2, area_id: 2, sensor_type: 'temperature', title: 'Nhiệt độ cao bất thường', message: 'Nhiệt độ hiện tại 29.5°C', severity: 'medium', status: 'open', created_at: iso(-180) },
    { alert_id: 3, area_id: 1, sensor_type: 'ec', title: 'EC thấp', message: 'EC hiện tại 1.1 mS/cm', severity: 'high', status: 'resolved', created_at: iso(-240), resolved_at: iso(-200), resolved_by: 3 },
  ],
  commands: [],
  tasks: [
    { task_id: 1, area_id: 1, assigned_to: 3, title: 'Kiểm tra đầu dò pH', description: 'Hiệu chuẩn lại cảm biến pH khu A', task_type: 'maintenance', scheduled_at: iso(1440), status: 'pending' },
    { task_id: 2, area_id: 2, assigned_to: 3, title: 'Thay dung dịch dinh dưỡng', description: 'Thay dung dịch theo lịch', task_type: 'care', scheduled_at: iso(2880), status: 'pending' },
  ],
};

const defaults = {
  temperature: 27.8,
  humidity: 72,
  ph: 6.3,
  ec: 1.95,
  light: 680,
  water_level: 72,
};

for (const sensor of store.sensors) {
  for (let i = 24; i >= 0; i--) {
    const base = defaults[sensor.sensor_type] ?? 0;
    const scale = sensor.sensor_type === 'light' ? 80 : sensor.sensor_type === 'water_level' ? 5 : sensor.sensor_type === 'humidity' ? 4 : 0.4;
    store.readings.push({
      reading_id: store.readings.length + 1,
      sensor_id: sensor.sensor_id,
      area_id: sensor.area_id,
      value: Number((base + Math.sin(i / 3) * scale).toFixed(2)),
      unit: sensor.unit,
      reading_time: iso(-i * 60),
      quality_flag: 'good',
    });
  }
}

export const nextId = (items, key) => Math.max(0, ...items.map((item) => Number(item[key]) || 0)) + 1;
