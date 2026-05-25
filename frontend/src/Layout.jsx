import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    // d-flex flex-column min-vh-100: Đảm bảo Footer luôn nằm dưới đáy màn hình dù nội dung ngắn
    <div className="d-flex flex-column min-vh-100 bg-light">
      
      {/* 1. HEADER (Thanh menu điều hướng) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/subjects">
            🎓 STU Quiz System
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/subjects">Môn Thi</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/users">Quản lý User</Link>
              </li>
              <li className="nav-item ms-3">
                {/* Nút đăng xuất tạm thời cho quay về trang Login */}
                <Link className="btn btn-light text-danger fw-bold rounded-pill px-4 shadow-sm" to="/">
                  Đăng xuất
                </Link>
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