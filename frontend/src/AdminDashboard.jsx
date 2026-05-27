import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'https://web-development-project-for-online.onrender.com/api/v1/users';

// Dữ liệu mẫu cho biểu đồ hoạt động (7 ngày gần nhất)
const ACTIVITY_DATA = [42, 58, 35, 71, 63, 88, 54];
const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MAX_VAL = Math.max(...ACTIVITY_DATA);

function StatCard({ icon, label, value, sub, accent, linkTo, linkLabel }) {
  return (
    <div className="adc-stat-card">
      <div className="adc-stat-card__icon" style={{ background: accent + '22', color: accent }}>
        {icon}
      </div>
      <div className="adc-stat-card__body">
        <p className="adc-stat-card__label">{label}</p>
        <p className="adc-stat-card__value">{value}</p>
        {sub && <p className="adc-stat-card__sub">{sub}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="adc-stat-card__link">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setUsers(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải dữ liệu người dùng từ API.');
        setLoading(false);
      });
  }, []);

  const recentUsers = [...users].reverse().slice(0, 5);

  if (loading) {
    return (
      <div className="adc-loading">
        <div className="adc-spinner" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="adc-page">
      {/* Page Header */}
      <div className="adc-page-header">
        <div>
          <h1 className="adc-page-title">📊 Dashboard</h1>
          <p className="adc-page-desc">Tổng quan hệ thống thi trắc nghiệm STU</p>
        </div>
        <span className="adc-date-badge">
          {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* Stat Cards */}
      <div className="adc-stats-grid">
        <StatCard
          icon="👥"
          label="Tổng tài khoản"
          value={loading ? '...' : users.length}
          sub={error ? 'Lỗi kết nối API' : 'Lấy từ API thực'}
          accent="#2563eb"
          linkTo="/admin/users"
          linkLabel="Xem danh sách"
        />
        <StatCard
          icon="📚"
          label="Môn thi"
          value="6"
          sub="Đang hoạt động"
          accent="#059669"
          linkTo="/admin/subjects"
          linkLabel="Quản lý môn thi"
        />
        <StatCard
          icon="❓"
          label="Câu hỏi"
          value="120"
          sub="Trong ngân hàng đề"
          accent="#d97706"
          linkTo="/admin/questions"
          linkLabel="Quản lý câu hỏi"
        />
        <StatCard
          icon="✅"
          label="Trạng thái"
          value="Online"
          sub="Hệ thống hoạt động bình thường"
          accent="#7c3aed"
        />
      </div>

      {/* Charts + Recent Users */}
      <div className="adc-grid-2col">
        {/* Bar Chart */}
        <div className="adc-card">
          <div className="adc-card__header">
            <h2 className="adc-card__title">📈 Hoạt động 7 ngày qua</h2>
            <span className="adc-card__badge adc-card__badge--blue">Lượt thi</span>
          </div>
          <div className="adc-bar-chart">
            {ACTIVITY_DATA.map((val, i) => (
              <div key={i} className="adc-bar-col">
                <div className="adc-bar-value">{val}</div>
                <div
                  className="adc-bar"
                  style={{ height: `${(val / MAX_VAL) * 100}%` }}
                  title={`${DAYS[i]}: ${val} lượt`}
                />
                <div className="adc-bar-label">{DAYS[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="adc-card">
          <div className="adc-card__header">
            <h2 className="adc-card__title">🕐 Người dùng gần đây</h2>
            <Link to="/admin/users" className="adc-card__badge adc-card__badge--ghost">
              Xem tất cả →
            </Link>
          </div>

          {error ? (
            <div className="adc-alert adc-alert--danger">{error}</div>
          ) : recentUsers.length === 0 ? (
            <p className="adc-empty">Chưa có dữ liệu.</p>
          ) : (
            <ul className="adc-user-list">
              {recentUsers.map((u, idx) => (
                <li key={u.id} className="adc-user-item">
                  <div className="adc-user-avatar" style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}>
                    {u.name ? u.name[0].toUpperCase() : '?'}
                  </div>
                  <div className="adc-user-info">
                    <span className="adc-user-name">{u.name}</span>
                    <span className="adc-user-phone">{u.phone}</span>
                  </div>
                  <span className="adc-user-id">#{u.id}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="adc-card">
        <div className="adc-card__header">
          <h2 className="adc-card__title">⚡ Truy cập nhanh</h2>
        </div>
        <div className="adc-quick-actions">
          <Link to="/admin/users" className="adc-quick-btn adc-quick-btn--blue">
            <span>👥</span> Quản lý người dùng
          </Link>
          <Link to="/admin/subjects" className="adc-quick-btn adc-quick-btn--green">
            <span>📚</span> Quản lý môn thi
          </Link>
          <Link to="/admin/questions" className="adc-quick-btn adc-quick-btn--amber">
            <span>❓</span> Quản lý câu hỏi
          </Link>
          <Link to="/admin/settings" className="adc-quick-btn adc-quick-btn--purple">
            <span>⚙️</span> Cài đặt hệ thống
          </Link>
        </div>
      </div>
    </div>
  );
}

const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626'];

export default AdminDashboard;
