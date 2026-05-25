import { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Gọi đúng đường link API v1   
    axios.get('https://web-development-project-for-online.onrender.com/api/v1/users')
      .then(response => {
        setUsers(response.data.data); // Lấy chuẩn mảng dữ liệu
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Hiệu ứng Loading xoay xoay đẹp mắt thay vì chữ "Đang tải..."
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        
        {/* Phần Header */}
        <div className="card-header bg-dark text-white p-4 d-flex justify-content-between align-items-center rounded-top-4">
          <div>
            <h3 className="mb-0 fw-bold">👩‍🎓 Quản lý Sinh viên</h3>
            <p className="mb-0 text-white-50 small">Hệ thống thi trắc nghiệm trực tuyến</p>
          </div>
          <button className="btn btn-primary fw-bold px-4 rounded-pill shadow">
            + Thêm User
          </button>
        </div>

        {/* Thanh công cụ tìm kiếm */}
        <div className="card-body bg-light p-3 border-bottom">
          <div className="row">
            <div className="col-md-5">
              <input type="text" className="form-control form-control-lg rounded-pill fs-6" placeholder="🔍 Tìm kiếm sinh viên..." />
            </div>
          </div>
        </div>

        {/* Bảng Dữ Liệu */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3 text-muted">ID</th>
                <th className="py-3 text-muted">HỌ VÀ TÊN</th>
                <th className="py-3 text-muted">SỐ ĐIỆN THOẠI</th>
                <th className="px-4 py-3 text-end text-muted">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 fw-bold text-secondary">#{user.id}</td>
                  <td className="fw-semibold text-dark">{user.name}</td>
                  <td>
                    {/* Format lại cột SĐT nhìn giống cái thẻ (badge) */}
                    <span className="badge bg-info bg-opacity-10 text-info border border-info rounded-pill px-3 py-2">
                      📞 {user.phone}
                    </span>
                  </td>
                  <td className="px-4 text-end">
                    <button className="btn btn-sm btn-light text-primary border me-2 px-3 rounded-pill fw-medium">Sửa</button>
                    <button className="btn btn-sm btn-light text-danger border px-3 rounded-pill fw-medium">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer phân trang tĩnh */}
        <div className="card-footer bg-white p-4 d-flex justify-content-between align-items-center rounded-bottom-4">
          <span className="text-muted small fw-medium">Tổng cộng: {users.length} tài khoản</span>
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled"><a className="page-link" href="#">Trước</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">Tiếp</a></li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default UserList;