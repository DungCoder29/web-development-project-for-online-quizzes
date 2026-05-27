import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useState } from 'react';

const NAV_ITEMS = [
  { to: '/admin',          icon: '📊', label: 'Dashboard',      end: true },
  { to: '/admin/users',    icon: '👥', label: 'Người dùng'              },
  { to: '/admin/subjects', icon: '📚', label: 'Môn thi'                 },
  { to: '/admin/questions',icon: '❓', label: 'Câu hỏi'                  },
  { to: '/admin/settings', icon: '⚙️', label: 'Cài đặt'                 },
];

function AdminLayout() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-shell">
      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar--open' : ''}`}>
        {/* Brand */}
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">🎓</div>
          <div>
            <div className="admin-sidebar__brand-title">STU Quiz</div>
            <div className="admin-sidebar__brand-sub">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="admin-sidebar__nav">
          <p className="admin-sidebar__section-label">QUẢN LÝ</p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-sidebar__link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">
              {auth.userId ? auth.userId[0].toUpperCase() : 'A'}
            </div>
            <div>
              <div className="admin-sidebar__username">{auth.userId || 'Admin'}</div>
              <div className="admin-sidebar__role">Quản trị viên</div>
            </div>
          </div>
          <button className="admin-sidebar__logout-btn" onClick={handleLogout}>
            🚪 Đăng xuất
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="admin-main">
        {/* Topbar (mobile) */}
        <header className="admin-topbar">
          <button
            className="admin-topbar__hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span /><span /><span />
          </button>
          <span className="admin-topbar__title">🎓 STU Quiz Admin</span>
          <div className="admin-topbar__badge">
            <span className="badge-dot" />
            Online
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
