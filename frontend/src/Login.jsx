import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  //  ĐÂY LÀ BIẾN (STATE): Dùng để lưu trữ tài khoản và mật khẩu khi người dùng gõ vào
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tạm thời xử lý logic đăng nhập tĩnh (Sau này kết nối API lấy token từ Backend)
    if (studentId.trim() !== '' && password.trim() !== '') {
      // Đăng nhập thành công thì chuyển hướng sang trang chọn môn
      navigate('/subjects');
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow border-0 rounded-4" style={{ width: '400px' }}>
        <div className="card-body p-5">
          <h2 className="text-center fw-bold mb-4 text-primary">ĐĂNG NHẬP THI</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">Mã Số Sinh Viên</label>
              <input 
                type="text" 
                className="form-control form-control-lg rounded-pill" 
                placeholder="Nhập mã SV..."
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)} // Cập nhật biến state liên tục
                required 
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary">Mật Khẩu</label>
              <input 
                type="password" 
                className="form-control form-control-lg rounded-pill" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Cập nhật biến state liên tục
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm">
              Vào Hệ Thống
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;