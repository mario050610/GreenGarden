import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { store } from '../data/store.js';

const router = Router();
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
  const user = store.users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());
  if (!user) return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
  if (user.status !== 'active') return res.status(403).json({ message: 'Tài khoản đã bị khóa' });
  const valid = user.password_hash.startsWith('plain:') ? password === user.password_hash.slice(6) : await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
  const role = store.roles.find((item) => item.role_id === user.role_id)?.role_name || 'owner';
  const token = jwt.sign({ id: user.user_id, email: user.email, role, name: user.full_name }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  res.json({ message: 'Đăng nhập thành công', token, user: { id: user.user_id, full_name: user.full_name, email: user.email, role } });
});
export default router;
