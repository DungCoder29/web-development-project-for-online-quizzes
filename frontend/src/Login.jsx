import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stuLogo from './assets/stu-logo.png';
import useAuth from './hooks/useAuth';

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [forgotStudentId, setForgotStudentId] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login, forgotPassword, loading, error } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedStudentId = studentId.trim();
    const trimmedPassword = password.trim();
    const studentIdPattern = /^DH\d{8}$/;

    if (!trimmedStudentId || !trimmedPassword) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin để tiếp tục.');
      setSuccessMessage('');
      return;
    }

    if (!studentIdPattern.test(trimmedStudentId)) {
      setErrorMessage('Mã số sinh viên phải bắt đầu bằng DH và theo sau 8 số, không có ký tự đặc biệt.');
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    try {
      await login(trimmedStudentId, trimmedPassword);
      navigate('/subjects');
    } catch (err) {
      // show error from hook if available
      setErrorMessage(err?.response?.data?.message || error || 'Đăng nhập thất bại');
    }
  };

  const handleForgotSubmit = async (event) => {
    event.preventDefault();

    const trimmedStudentId = forgotStudentId.trim();
    const studentIdPattern = /^DH\d{8}$/;

    if (!trimmedStudentId) {
      setErrorMessage('Vui lòng nhập mã số sinh viên để tiếp tục.');
      setSuccessMessage('');
      return;
    }

    if (!studentIdPattern.test(trimmedStudentId)) {
      setErrorMessage('Mã số sinh viên phải bắt đầu bằng DH và theo sau 8 số.');
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await forgotPassword(trimmedStudentId);
      setSuccessMessage(response?.message || 'Yêu cầu đặt lại mật khẩu đã được gửi.');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || error || 'Không thể gửi yêu cầu quên mật khẩu.');
    }
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

          {forgotMode ? (
            <form onSubmit={handleForgotSubmit}>
              <div className="form-field">
                <label htmlFor="forgotStudentId">MSSV</label>
                <input
                  id="forgotStudentId"
                  type="text"
                  className="glass-input"
                  placeholder="VD: DH12345678"
                  value={forgotStudentId}
                  onChange={(e) => setForgotStudentId(e.target.value.toUpperCase())}
                  autoComplete="username"
                  pattern="^DH\\d{8}$"
                  title="Mã phải bắt đầu bằng DH và theo sau 8 chữ số"
                />
              </div>

              {errorMessage && <p className="form-error">{errorMessage}</p>}
              {successMessage && <p className="form-success">{successMessage}</p>}

              <button type="submit" className="primary-btn" disabled={loading}>
                <span>{loading ? 'Đang xử lý...' : 'Gửi yêu cầu quên mật khẩu'}</span>
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  setForgotMode(false);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
              >
                Quay lại đăng nhập
              </button>
            </form>
          ) : (
            <>
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
                    pattern="^DH\\d{8}$"
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
                {successMessage && <p className="form-success">{successMessage}</p>}

                <button type="submit" className="primary-btn" disabled={loading}>
                  <span>{loading ? 'Đang xử lý...' : '🔒 Đăng nhập'}</span>
                </button>
              </form>

              <button
                type="button"
                className="forgot-link"
                onClick={() => {
                  setForgotMode(true);
                  setErrorMessage('');
                  setSuccessMessage('');
                  setForgotStudentId(studentId);
                }}
              >
                Quên mật khẩu?
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Login;
