import sql from 'mssql';
import { config } from './config.js';

let pool;

export const isSqlMode = () => config.dataMode.toLowerCase() === 'mssql';

export async function connectDatabase() {
  if (!isSqlMode()) return null;
  if (pool?.connected) return pool;
  pool = await sql.connect(config.db);
  console.log(`[database] Connected to ${config.db.database}`);
  return pool;
}

export async function query(text, params = {}) {
  const db = await connectDatabase();
  const request = db.request();
  for (const [name, value] of Object.entries(params)) request.input(name, value);
  return request.query(text);
}

export { sql };
