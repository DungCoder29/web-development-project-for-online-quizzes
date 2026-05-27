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

    const trimmedStudentId = studentId.trim().toUpperCase();
    const trimmedPassword = password.trim().toUpperCase();
    const studentIdPattern = /^DH\d{8}$/;

    if (!trimmedStudentId || !trimmedPassword) {
      setErrorMessage('Vui lòng điền đủ MSSV và mật khẩu.');
      return;
    }

    if (!studentIdPattern.test(trimmedStudentId) || !studentIdPattern.test(trimmedPassword)) {
      setErrorMessage('MSSV và mật khẩu phải có định dạng DH theo sau 8 chữ số.');
      return;
    }

    if (trimmedStudentId !== trimmedPassword) {
      setErrorMessage('Mật khẩu phải trùng với MSSV.');
      return;
    }

    localStorage.setItem('token', trimmedStudentId);
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
