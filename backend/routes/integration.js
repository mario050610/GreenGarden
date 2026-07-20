import { Router } from 'express';
import { allowRoles } from '../middleware/auth.js';
import { getMqttStatus } from '../mqtt.js';
import { config } from '../config.js';

const router = Router();

router.get('/status', allowRoles('admin', 'technician'), (req, res) => {
  res.json({
    mqtt: getMqttStatus(),
    adafruit: {
      configured: Boolean(config.mqtt.adafruit.username && config.mqtt.adafruit.key),
      username: config.mqtt.adafruit.username || null,
      device_command_feed: config.mqtt.adafruit.deviceCommandFeed,
      device_status_feed: config.mqtt.adafruit.deviceStatusFeed,
      gateway_status_feed: config.mqtt.adafruit.gatewayStatusFeed,
    },
  });
});

export default router;
