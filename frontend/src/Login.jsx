import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stuLogo from './assets/stu-logo.png';
import { useAuth } from './AuthContext';

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const rawStudentId = studentId.trim();
    const rawPassword = password.trim();

    // 1. Kiểm tra tài khoản Admin đặc biệt
    if (rawStudentId === 'ADMIN' && rawPassword === 'Admin@123') {
      login({ userId: 'ADMIN', role: 'admin', token: 'admin-token' });
      navigate('/admin');
      return;
    }

    // 2. Giữ nguyên logic cũ của Sinh viên
    const upperStudentId = rawStudentId.toUpperCase();
    const upperPassword = rawPassword.toUpperCase();
    const studentIdPattern = /^DH\d{8}$/;

    if (!upperStudentId || !upperPassword) {
      setErrorMessage('Vui lòng điền đủ MSSV và mật khẩu.');
      return;
    }

    if (!studentIdPattern.test(upperStudentId) || !studentIdPattern.test(upperPassword)) {
      setErrorMessage('MSSV và mật khẩu phải có định dạng DH theo sau 8 chữ số.');
      return;
    }

    if (upperStudentId !== upperPassword) {
      setErrorMessage('Mật khẩu phải trùng với MSSV.');
      return;
    }

    login({ userId: upperStudentId, role: 'student', token: upperStudentId });
    navigate('/subjects');
  };

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div>
          <div className="hero-copy">
            <div className="main-logo">
              <img src={stuLogo} alt="STU logo" className="stu-logo-img" />
            </div>
            <h1>Trang đăng nhập<br />Hệ thống thi trắc nghiệm</h1>
            <p className="hero-accent"></p>
          </div>
        </div>
      </section>

      <section className="login-aside">
        <div className="aside-shape shape-a" />
        <div className="aside-shape shape-b" />

        <div className="glass-card">
          <div className="form-header">
            <h2>Đăng nhập</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="studentId">MSSV</label>
              <input
                id="studentId"
                type="text"
                className="glass-input"
                placeholder="VD: DH12345678"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                autoComplete="username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                className="glass-input"
                placeholder="Nhập lại MSSV"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <button type="submit" className="primary-btn">
              🔒 Đăng nhập
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
