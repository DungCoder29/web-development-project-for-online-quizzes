import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stuLogo from './assets/stu-logo.png';
import { useAuth } from './AuthContext';
import api from './api';

function Login() {
  const [panel, setPanel] = useState('login'); // 'login' | 'register' | 'forgot'

  // --- Login state ---
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // --- Register state ---
  const [regId, setRegId] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // --- Forgot state ---
  const [forgotId, setForgotId] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  // ── Đăng nhập ──────────────────────────────────────────────
  const handleSubmit = (event) => {
    event.preventDefault();
    const rawStudentId = studentId.trim();
    const rawPassword = password.trim();

    if (rawStudentId === 'ADMIN' && rawPassword === 'Admin@123') {
      login({ userId: 'ADMIN', role: 'admin', token: 'admin-token' });
      navigate('/admin');
      return;
    }

    const upperStudentId = rawStudentId.toUpperCase();
    const upperPassword = rawPassword.toUpperCase();
    const studentIdPattern = /^DH\d{8}$/;

    if (!upperStudentId || !upperPassword) {
      setErrorMessage('Vui lòng điền đủ MSSV và mật khẩu.');
      return;
    }
    if (!studentIdPattern.test(upperStudentId)) {
      setErrorMessage('MSSV phải có định dạng DH theo sau 8 chữ số.');
      return;
    }
    if (upperStudentId !== upperPassword) {
      setErrorMessage('Mật khẩu không đúng. Mật khẩu mặc định là MSSV của bạn.');
      return;
    }

    setErrorMessage('');
    login({ userId: upperStudentId, role: 'student', token: upperStudentId });
    navigate('/subjects');
  };

  // ── Đăng ký ────────────────────────────────────────────────
  const handleRegister = (event) => {
    event.preventDefault();
    setRegError('');
    setRegSuccess('');

    const upperRegId = regId.trim().toUpperCase();
    const studentIdPattern = /^DH\d{8}$/;

    if (!upperRegId || !regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }
    if (!studentIdPattern.test(upperRegId)) {
      setRegError('MSSV phải có định dạng DH theo sau 8 chữ số.');
      return;
    }
    if (!regEmail.endsWith('@stu.edu.vn')) {
      setRegError('Vui lòng dùng email sinh viên (@stu.edu.vn).');
      return;
    }
    if (regPassword.length < 8) {
      setRegError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    // Call the registration API
    api.post('/register', {
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword.trim(),
      phone: upperRegId // Store student ID (MSSV) in the phone field so it displays in Admin panel user list!
    })
    .then(() => {
      setRegSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
      setTimeout(() => {
        setPanel('login');
        setRegSuccess('');
        setRegId(''); setRegName(''); setRegEmail(''); setRegPassword('');
      }, 1800);
    })
    .catch((err) => {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Đăng ký thất bại, email đã được sử dụng hoặc có lỗi xảy ra.';
      setRegError(errMsg);
    });
  };

  // ── Quên mật khẩu ──────────────────────────────────────────
  const handleForgot = (event) => {
    event.preventDefault();
    setForgotMsg('');

    const upperForgotId = forgotId.trim().toUpperCase();
    const studentIdPattern = /^DH\d{8}$/;

    if (!upperForgotId || !forgotEmail.trim()) {
      setForgotMsg('error:Vui lòng điền đủ MSSV và email.');
      return;
    }
    if (!studentIdPattern.test(upperForgotId)) {
      setForgotMsg('error:MSSV phải có định dạng DH theo sau 8 chữ số.');
      return;
    }
    if (!forgotEmail.endsWith('@stu.edu.vn')) {
      setForgotMsg('error:Vui lòng dùng email sinh viên (@stu.edu.vn).');
      return;
    }

    // TODO: Gọi API gửi email đặt lại mật khẩu ở đây
    setForgotMsg('success:Link đặt lại mật khẩu đã được gửi đến email của bạn!');
  };

  const forgotIsError = forgotMsg.startsWith('error:');
  const forgotText = forgotMsg.replace(/^(error|success):/, '');

  return (
    <main className="login-shell">
      {/* ── Left hero ── */}
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

      {/* ── Right card ── */}
      <section className="login-aside">
        <div className="aside-shape shape-a" />
        <div className="aside-shape shape-b" />

        <div className="glass-card">

          {/* ════ PANEL: ĐĂNG NHẬP ════ */}
          {panel === 'login' && (
            <>
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
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  {!password && studentId && (
                    <p className="form-hint">💡 Mật khẩu mặc định là MSSV của bạn</p>
                  )}
                </div>

                {errorMessage && <p className="form-error">{errorMessage}</p>}

                <button type="submit" className="primary-btn">
                  🔒 Đăng nhập
                </button>
              </form>

              <div className="panel-links">
                <button className="link-btn" onClick={() => setPanel('forgot')}>
                  Quên mật khẩu?
                </button>
                <button className="link-btn" onClick={() => setPanel('register')}>
                  Chưa có tài khoản?
                </button>
              </div>

              <div className="panel-divider">
                <span />
                <small>hoặc</small>
                <span />
              </div>

              <button className="secondary-btn" onClick={() => setPanel('register')}>
                + Đăng ký tài khoản
              </button>
            </>
          )}

          {/* ════ PANEL: ĐĂNG KÝ ════ */}
          {panel === 'register' && (
            <>
              <div className="form-header">
                <button className="back-btn" onClick={() => setPanel('login')}>← Quay lại</button>
                <h2>Đăng ký</h2>
              </div>

              <form onSubmit={handleRegister}>
                <div className="form-field">
                  <label htmlFor="regId">MSSV</label>
                  <input
                    id="regId"
                    type="text"
                    className="glass-input"
                    placeholder="VD: DH12345678"
                    value={regId}
                    onChange={(e) => setRegId(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="regName">Họ và tên</label>
                  <input
                    id="regName"
                    type="text"
                    className="glass-input"
                    placeholder="Nguyễn Văn A"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="regEmail">Email sinh viên</label>
                  <input
                    id="regEmail"
                    type="email"
                    className="glass-input"
                    placeholder="mssv@stu.edu.vn"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="regPassword">Mật khẩu</label>
                  <input
                    id="regPassword"
                    type="password"
                    className="glass-input"
                    placeholder="Tối thiểu 8 ký tự"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>

                {regError && <p className="form-error">{regError}</p>}
                {regSuccess && <p className="form-success">{regSuccess}</p>}

                <button type="submit" className="primary-btn">✔ Tạo tài khoản</button>
              </form>

              <p className="panel-note">
                Đã có tài khoản?{' '}
                <button className="link-btn" onClick={() => setPanel('login')}>Đăng nhập ngay</button>
              </p>
            </>
          )}

          {/* ════ PANEL: QUÊN MẬT KHẨU ════ */}
          {panel === 'forgot' && (
            <>
              <div className="form-header">
                <button className="back-btn" onClick={() => setPanel('login')}>← Quay lại</button>
                <h2>Quên mật khẩu</h2>
              </div>

              <form onSubmit={handleForgot}>
                <div className="form-field">
                  <label htmlFor="forgotId">MSSV</label>
                  <input
                    id="forgotId"
                    type="text"
                    className="glass-input"
                    placeholder="VD: DH12345678"
                    value={forgotId}
                    onChange={(e) => setForgotId(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="forgotEmail">Email sinh viên</label>
                  <input
                    id="forgotEmail"
                    type="email"
                    className="glass-input"
                    placeholder="mssv@stu.edu.vn"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>

                {forgotMsg && (
                  <p className={forgotIsError ? 'form-error' : 'form-success'}>{forgotText}</p>
                )}

                <button type="submit" className="primary-btn">✉ Gửi link đặt lại</button>
              </form>

              <p className="panel-note">
                Link đặt lại sẽ được gửi đến email sinh viên của bạn.
              </p>
            </>
          )}

        </div>
      </section>
    </main>
  );
}

export default Login;