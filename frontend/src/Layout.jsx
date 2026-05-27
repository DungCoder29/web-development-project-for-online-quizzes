import { Outlet, Link, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    // d-flex flex-column min-vh-100: Đảm bảo Footer luôn nằm dưới đáy màn hình dù nội dung ngắn
    <div className="d-flex flex-column min-vh-100" style={{background:'transparent'}}>
      
      {/* 1. HEADER (Thanh menu điều hướng) */}
      <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{background:'linear-gradient(90deg, rgba(170,59,255,0.08), rgba(0,168,232,0.06))'}}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4 nav-link" to="/subjects">
            <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l9 4.5v9L12 22 3 15.5v-9L12 2z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            STU Quiz System
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3 nav-link" to="/subjects"><span className="nav-icon">📚</span> Môn Thi</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3 nav-link" to="/admin"><span className="nav-icon">👥</span> Quản lý User</Link>
              </li>
              <li className="nav-item ms-3">
                <button className="btn" type="button" onClick={handleLogout} style={{background:'white', color:'#ef4444', fontWeight:700, borderRadius:20, padding:'8px 18px', boxShadow:'0 6px 18px rgba(16,24,40,0.06)'}}>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT (Nội dung từng trang sẽ được "bơm" vào đây) */}
      <main className="flex-grow-1">
        <Outlet /> 
      </main>

      {/* 3. FOOTER (Chân trang) */}
      <footer className="bg-dark text-white-50 text-center py-4 mt-auto">
        <div className="container">
          <p className="mb-0">© 2026 Hệ thống Thi Trắc Nghiệm Trực Tuyến.</p>
          <small>Phát triển bởi Nhóm 2 - Sài Gòn Technology University (STU).</small>
        </div>
      </footer>

    </div>
  );
}

export default Layout;