import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stuLogo from './assets/stu-logo.png';

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedStudentId = studentId.trim();
    const trimmedPassword = password.trim();
    const studentIdPattern = /^DH\d{8}$/;

    if (!trimmedStudentId || !trimmedPassword) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin để tiếp tục.');
      return;
    }

    if (!studentIdPattern.test(trimmedStudentId)) {
      setErrorMessage('Mã số sinh viên phải bắt đầu bằng DH và theo sau 8 số, không có ký tự đặc biệt.');
      return;
    }

    setErrorMessage('');
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
            <p className="eyebrow"></p>
            <h1>Trang đăng nhập<br />Hệ thống thi trắc nghiệm</h1>
            <p className="hero-accent"></p>
          </div>
        </div>

        {/* contact-list removed as requested */}
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
              <label htmlFor="studentId">Mã số sinh viên</label>
              <input
                id="studentId"
                type="text"
                className="glass-input"
                placeholder="VD: DH12345678"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                autoComplete="username"
                pattern="^DH\d{8}$"
                title="Mã phải bắt đầu bằng DH và theo sau 8 chữ số"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                className="glass-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <button type="submit" className="primary-btn">
              <span>🔒 Đăng nhập</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
