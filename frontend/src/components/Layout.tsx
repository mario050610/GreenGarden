import {
  Activity,
  AlertTriangle,
  BarChart3,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  Leaf,
  LogOut,
  Settings2,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import type { Role } from '../types';

const roleLabels: Record<Role, string> = {
  admin: 'Quản trị viên',
  owner: 'Chủ vườn',
  technician: 'Kỹ thuật viên',
};

const items: Array<{ to: string; label: string; icon: LucideIcon; roles: Role[] }> = [
  { to: '/', label: 'Tổng quan', icon: LayoutDashboard, roles: ['admin', 'owner', 'technician'] },
  { to: '/environment', label: 'Chỉ số môi trường', icon: Gauge, roles: ['owner', 'technician'] },
  { to: '/devices', label: 'Thiết bị', icon: Settings2, roles: ['admin', 'owner', 'technician'] },
  { to: '/alerts', label: 'Cảnh báo', icon: AlertTriangle, roles: ['admin', 'owner', 'technician'] },
  { to: '/history', label: 'Lịch sử dữ liệu', icon: BarChart3, roles: ['owner', 'technician'] },
  { to: '/thresholds', label: 'Cấu hình ngưỡng', icon: SlidersHorizontal, roles: ['admin', 'owner'] },
  { to: '/areas', label: 'Khu vực trồng', icon: Leaf, roles: ['admin', 'owner'] },
  { to: '/tasks', label: 'Công việc & bảo trì', icon: ClipboardList, roles: ['admin', 'technician'] },
  { to: '/users', label: 'Người dùng', icon: Users, roles: ['admin'] },
];

export function Layout() {
  const { user, logout } = useAuth();
  const visibleItems = items.filter((item) => user && item.roles.includes(user.role));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Leaf /></div>
          <div>
            <strong>GREEN ARGRIC</strong>
            <small>Hệ thống thủy canh IoT</small>
          </div>
        </div>

        <nav>
          {visibleItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="profile">
          <div className="avatar">{user?.full_name?.[0] || 'A'}</div>
          <div>
            <strong>{user?.full_name}</strong>
            <small>{user ? roleLabels[user.role] : ''}</small>
          </div>
        </div>

        <button className="logout" onClick={logout}>
          <LogOut size={17} />
          Đăng xuất
        </button>
      </aside>

      <main>
        <header>
          <div>
            <h2>Hệ thống giám sát vườn thủy canh</h2>
            <p>GREEN ARGRIC · cập nhật theo thời gian thực</p>
          </div>
          <div className="header-badge"><Activity size={17} />Đang hoạt động</div>
        </header>
        <section className="content"><Outlet /></section>
      </main>
    </div>
  );
}
