import { useState } from 'react';

function AdminSettings() {
  const [systemName, setSystemName]   = useState('STU Quiz System');
  const [maxTime, setMaxTime]         = useState(60);
  const [allowRedo, setAllowRedo]     = useState(false);
  const [showResult, setShowResult]   = useState(true);
  const [oldPw, setOldPw]             = useState('');
  const [newPw, setNewPw]             = useState('');
  const [confirmPw, setConfirmPw]     = useState('');
  const [toast, setToast]             = useState('');
  const [toastType, setToastType]     = useState('success');

  const showToast = (msg, type = 'success') => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    if (!systemName.trim()) { showToast('❌ Tên hệ thống không được để trống!', 'danger'); return; }
    showToast('✅ Đã lưu cài đặt chung thành công!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!oldPw || !newPw || !confirmPw) { showToast('❌ Vui lòng điền đầy đủ các trường mật khẩu.', 'danger'); return; }
    if (oldPw !== 'Admin@123') { showToast('❌ Mật khẩu hiện tại không đúng.', 'danger'); return; }
    if (newPw.length < 6) { showToast('❌ Mật khẩu mới phải có ít nhất 6 ký tự.', 'danger'); return; }
    if (newPw !== confirmPw) { showToast('❌ Mật khẩu xác nhận không khớp.', 'danger'); return; }
    setOldPw(''); setNewPw(''); setConfirmPw('');
    showToast('✅ Đã đổi mật khẩu thành công!');
  };

  return (
    <div className="adc-page">
      {toast && <div className={`adc-toast ${toastType === 'danger' ? 'adc-toast--danger' : ''}`}>{toast}</div>}

      {/* Header */}
      <div className="adc-page-header">
        <div>
          <h1 className="adc-page-title">⚙️ Cài đặt hệ thống</h1>
          <p className="adc-page-desc">Quản lý thông tin và cấu hình hệ thống</p>
        </div>
      </div>

      <div className="adc-settings-grid">
        {/* Cài đặt chung */}
        <div className="adc-card">
          <div className="adc-card__header">
            <h2 className="adc-card__title">🛠 Cài đặt chung</h2>
          </div>
          <form onSubmit={handleSaveGeneral}>
            <div className="adc-form-field">
              <label>Tên hệ thống</label>
              <input
                className="adc-input"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
              />
            </div>
            <div className="adc-form-field">
              <label>Thời gian thi mặc định (phút)</label>
              <input
                className="adc-input"
                type="number"
                min="1"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
              />
            </div>
            <div className="adc-setting-row">
              <div>
                <p className="adc-setting-row__label">Cho phép làm lại</p>
                <p className="adc-setting-row__desc">Sinh viên được phép nộp bài lại nhiều lần</p>
              </div>
              <label className="adc-toggle">
                <input type="checkbox" checked={allowRedo} onChange={(e) => setAllowRedo(e.target.checked)} />
                <span className="adc-toggle__slider" />
              </label>
            </div>
            <div className="adc-setting-row">
              <div>
                <p className="adc-setting-row__label">Hiển thị kết quả sau khi nộp</p>
                <p className="adc-setting-row__desc">Sinh viên xem được đáp án đúng ngay sau khi nộp bài</p>
              </div>
              <label className="adc-toggle">
                <input type="checkbox" checked={showResult} onChange={(e) => setShowResult(e.target.checked)} />
                <span className="adc-toggle__slider" />
              </label>
            </div>
            <div style={{ marginTop: 24 }}>
              <button type="submit" className="adc-btn adc-btn--primary">
                💾 Lưu cài đặt
              </button>
            </div>
          </form>
        </div>

        {/* Đổi mật khẩu */}
        <div className="adc-card">
          <div className="adc-card__header">
            <h2 className="adc-card__title">🔐 Đổi mật khẩu Admin</h2>
          </div>
          <form onSubmit={handleChangePassword}>
            <div className="adc-form-field">
              <label>Mật khẩu hiện tại</label>
              <input
                className="adc-input"
                type="password"
                placeholder="••••••••"
                value={oldPw}
                onChange={(e) => setOldPw(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="adc-form-field">
              <label>Mật khẩu mới</label>
              <input
                className="adc-input"
                type="password"
                placeholder="••••••••"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="adc-form-field">
              <label>Xác nhận mật khẩu mới</label>
              <input
                className="adc-input"
                type="password"
                placeholder="••••••••"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <button type="submit" className="adc-btn adc-btn--primary">
                🔑 Đổi mật khẩu
              </button>
            </div>
          </form>
        </div>

        {/* Thông tin hệ thống */}
        <div className="adc-card">
          <div className="adc-card__header">
            <h2 className="adc-card__title">ℹ️ Thông tin hệ thống</h2>
          </div>
          <div className="adc-info-list">
            <div className="adc-info-row">
              <span className="adc-info-row__label">Tên dự án</span>
              <span className="adc-info-row__value">STU Online Quiz System</span>
            </div>
            <div className="adc-info-row">
              <span className="adc-info-row__label">Frontend</span>
              <span className="adc-info-row__value">
                <span className="adc-chip adc-chip--blue">React 19 + Vite</span>
              </span>
            </div>
            <div className="adc-info-row">
              <span className="adc-info-row__label">Backend</span>
              <span className="adc-info-row__value">
                <span className="adc-chip adc-chip--green">Laravel (PHP)</span>
              </span>
            </div>
            <div className="adc-info-row">
              <span className="adc-info-row__label">API Host</span>
              <span className="adc-info-row__value" style={{ fontSize: '0.82rem', wordBreak: 'break-all' }}>
                web-development-project-for-online.onrender.com
              </span>
            </div>
            <div className="adc-info-row">
              <span className="adc-info-row__label">Phiên bản</span>
              <span className="adc-info-row__value">v1.0.0</span>
            </div>
            <div className="adc-info-row">
              <span className="adc-info-row__label">Trường</span>
              <span className="adc-info-row__value">Sài Gòn Technology University (STU)</span>
            </div>
            <div className="adc-info-row">
              <span className="adc-info-row__label">Nhóm</span>
              <span className="adc-info-row__value">Nhóm 2</span>
            </div>
            <div className="adc-info-row">
              <span className="adc-info-row__label">Trạng thái API</span>
              <span className="adc-info-row__value">
                <span className="adc-chip adc-chip--green">● Online</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
