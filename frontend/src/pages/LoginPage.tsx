import { useState } from 'react';
import { Leaf, Lock, Mail } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import type { Role } from '../types';

const demoAccounts: Array<{ role: Role; label: string; email: string }> = [
  { role: 'admin', label: 'Quản trị viên', email: 'admin@greenargric.edu.vn' },
  { role: 'owner', label: 'Chủ vườn', email: 'owner@greenargric.edu.vn' },
  { role: 'technician', label: 'Kỹ thuật viên', email: 'tech@greenargric.edu.vn' },
];

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState(demoAccounts[0].email);
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-brand">
          <div className="login-logo"><Leaf /></div>
          <div>
            <h1>GREEN ARGRIC</h1>
            <p>Smart Hydroponic Monitoring System</p>
          </div>
        </div>
        <h3>Hệ thống giám sát và điều chỉnh môi trường vườn thủy canh thông minh.</h3>
        <ul>
          <li>Giám sát chỉ số môi trường theo thời gian thực</li>
          <li>Điều khiển thiết bị tự động thông minh</li>
          <li>Cảnh báo bất thường tức thì qua IoT</li>
          <li>Phân tích dữ liệu và báo cáo thống kê</li>
        </ul>
        <div className="login-stats">
          <span><b>6</b>Khu vực trồng</span>
          <span><b>28+</b>Cảm biến IoT</span>
          <span><b>24/7</b>Giám sát liên tục</span>
        </div>
      </div>

      <div className="login-panel">
        <form onSubmit={submit}>
          <div className="round-leaf"><Leaf /></div>
          <h2>Đăng nhập hệ thống</h2>
          <p>Nhập thông tin tài khoản của bạn</p>

          <label>Địa chỉ Email</label>
          <div className="input-wrap">
            <Mail size={18} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>

          <label>Mật khẩu</label>
          <div className="input-wrap">
            <Lock size={18} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>

          {error && <div className="error-box">{error}</div>}
          <button className="primary" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          <div className="demo-box">
            <b>Tài khoản demo · mật khẩu: demo123</b>
            <div className="demo-account-list">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  className={email === account.email ? 'demo-account active' : 'demo-account'}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('demo123');
                  }}
                >
                  <span>{account.label}</span>
                  <small>{account.email}</small>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
