import { Router } from 'express';
import { store, nextId } from '../data/store.js';
import { publishDeviceCommand } from '../mqtt.js';
import { allowRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => res.json(store.devices.map((device) => ({
  ...device,
  area_name: store.areas.find((area) => area.area_id === device.area_id)?.area_name,
}))));

router.post('/override', allowRoles('admin', 'owner', 'technician'), async (req, res) => {
  const device = store.devices.find((item) => item.device_id === Number(req.body.device_id));
  if (!device) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });

  const state = String(req.body.state || req.body.mode || '').toUpperCase();
  if (!['ON', 'OFF'].includes(state)) {
    return res.status(400).json({ message: 'Trạng thái phải là ON hoặc OFF' });
  }

  device.mode = req.body.control_mode || 'MANUAL';
  const command = {
    command_id: nextId(store.commands, 'command_id'),
    device_id: device.device_id,
    user_id: req.user.id,
    command_type: state,
    source: 'manual',
    payload: JSON.stringify(req.body),
    result_status: 'pending',
    sent_at: new Date().toISOString(),
  };
  store.commands.unshift(command);

  const result = await publishDeviceCommand(device, state, { source: 'manual' });
  command.request_id = result.requestId || null;
  command.result_status = result.sent ? 'sent' : 'not_sent';

  // Khi không bật MQTT, cập nhật tức thời để UI vẫn demo được ở DATA_MODE=memory.
  if (!result.sent) device.status = state;

  return res.json({
    message: result.sent ? 'Đã gửi lệnh đến IoT Gateway' : 'Đã cập nhật chế độ demo; MQTT chưa kết nối',
    device,
    command,
    mqtt: result,
  });
});

router.post('/', allowRoles('admin', 'technician'), (req, res) => {
  const item = {
    device_id: nextId(store.devices, 'device_id'),
    area_id: Number(req.body.area_id),
    device_code: req.body.device_code,
    device_name: req.body.device_name,
    device_type: req.body.device_type,
    adafruit_device_key: req.body.adafruit_device_key || req.body.device_type,
    status: req.body.status || 'OFF',
    mode: req.body.mode || 'MANUAL',
    command_topic: req.body.command_topic || '',
    status_topic: req.body.status_topic || '',
    last_seen: null,
  };
  store.devices.push(item);
  res.status(201).json(item);
});

router.put('/:id', allowRoles('admin', 'technician'), (req, res) => {
  const item = store.devices.find((device) => device.device_id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
  Object.assign(item, req.body, { device_id: item.device_id });
  return res.json(item);
});

router.delete('/:id', allowRoles('admin'), (req, res) => {
  const index = store.devices.findIndex((device) => device.device_id === Number(req.params.id));
  if (index < 0) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
  store.devices.splice(index, 1);
  return res.json({ message: 'Xóa thiết bị thành công' });
});

export default router;
