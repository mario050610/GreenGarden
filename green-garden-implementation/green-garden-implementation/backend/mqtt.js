import mqtt from 'mqtt';
import { config } from './config.js';
import { store, nextId } from './data/store.js';
import { evaluateReading } from './core/automation.js';

let client;

export function startMqtt() {
  if (!config.mqtt.enabled) {
    console.log('[mqtt] Disabled (set MQTT_ENABLED=true to enable)');
    return null;
  }
  client = mqtt.connect(config.mqtt.broker, { username: config.mqtt.username, password: config.mqtt.password, reconnectPeriod: 3000 });
  client.on('connect', () => {
    const topic = `${config.mqtt.baseTopic}/area/+/sensor/+/data`;
    client.subscribe(topic);
    console.log(`[mqtt] Connected and subscribed to ${topic}`);
  });
  client.on('message', async (topic, buffer) => {
    try {
      const payload = JSON.parse(buffer.toString());
      const sensorCode = topic.split('/')[4];
      const sensor = store.sensors.find((item) => item.sensor_code === sensorCode);
      if (!sensor) return;
      sensor.last_seen = new Date().toISOString();
      sensor.status = 'online';
      const reading = {
        reading_id: nextId(store.readings, 'reading_id'), sensor_id: sensor.sensor_id, area_id: sensor.area_id,
        value: Number(payload.value), unit: payload.unit || sensor.unit, reading_time: payload.timestamp || new Date().toISOString(), quality_flag: payload.quality || 'good',
      };
      store.readings.push(reading);
      await evaluateReading(reading, sensor);
    } catch (error) { console.error('[mqtt] Invalid payload:', error.message); }
  });
  client.on('error', (error) => console.error('[mqtt]', error.message));
  return client;
}

export async function publishDeviceCommand(device, state) {
  if (!client?.connected) return false;
  client.publish(device.command_topic, JSON.stringify({ state, timestamp: new Date().toISOString() }), { qos: 1 });
  return true;
}
