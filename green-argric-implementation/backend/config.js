import 'dotenv/config';

const bool = (value, fallback = false) => {
  if (value == null) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

export const config = {
  port: Number(process.env.PORT || 3000),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'green_argric_dev_secret_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  dataMode: process.env.DATA_MODE || 'memory',
  db: {
    server: process.env.DB_SERVER || '127.0.0.1',
    port: Number(process.env.DB_PORT || 1433),
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'GreenArgric',
    options: {
      encrypt: bool(process.env.DB_ENCRYPT, false),
      trustServerCertificate: bool(process.env.DB_TRUST_CERT, true),
    },
  },
  mqtt: {
    enabled: bool(process.env.MQTT_ENABLED, false),
    broker: process.env.MQTT_BROKER || 'mqtt://127.0.0.1:1883',
    username: process.env.MQTT_USERNAME || undefined,
    password: process.env.MQTT_PASSWORD || undefined,
    baseTopic: process.env.MQTT_BASE_TOPIC || 'greenargric',
  },
};
