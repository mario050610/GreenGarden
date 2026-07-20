import { Router } from 'express';
import { store } from '../data/store.js';
const router = Router();
router.get('/', (req, res) => {
  const latest = store.sensors.map((sensor) => {
    const readings = store.readings.filter((item) => item.sensor_id === sensor.sensor_id).sort((a,b) => new Date(b.reading_time)-new Date(a.reading_time));
    return { ...sensor, latest: readings[0] || null };
  });
  const areaHealth = store.areas.map((area) => {
    const areaSensors = latest.filter((item) => item.area_id === area.area_id);
    const ok = areaSensors.filter((sensor) => {
      const t = store.thresholds.find((x) => x.area_id === area.area_id && x.sensor_type === sensor.sensor_type);
      return !t || (sensor.latest?.value >= t.min_value && sensor.latest?.value <= t.max_value);
    }).length;
    return { area_id: area.area_id, area_name: area.area_name, crop_type: area.crop_type, health: areaSensors.length ? Math.round(ok / areaSensors.length * 100) : 100 };
  });
  res.json({
    summary: { areas: store.areas.filter(x=>x.status==='active').length, alerts: store.alerts.filter(x=>x.status==='open').length, devices: store.devices.length, healthySensors: latest.filter(x=>x.status==='online').length },
    latest: latest.filter((item) => item.area_id === 1),
    alerts: store.alerts.slice(0, 5), areaHealth,
    devices: { on: store.devices.filter(x=>x.status==='ON').length, off: store.devices.filter(x=>x.status==='OFF').length, auto: store.devices.filter(x=>x.mode==='AUTO').length },
  });
});
export default router;
