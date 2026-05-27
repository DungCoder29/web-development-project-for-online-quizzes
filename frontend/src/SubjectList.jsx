import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SubjectList() {
  const navigate = useNavigate();
  
  // 📌 CÁC BIẾN (STATE) QUẢN LÝ DỮ LIỆU
  const [subjects, setSubjects] = useState([]);      // Lưu gốc danh sách môn học từ API
  const [loading, setLoading] = useState(true);        // Trạng thái chờ tải dữ liệu
  const [searchTerm, setSearchTerm] = useState('');    // Lưu từ khóa tìm kiếm sinh viên gõ
  const [sortOrder, setSortOrder] = useState('asc');   // Thứ tự sắp xếp: 'asc' (A-Z) hoặc 'desc' (Z-A)

  // 📌 CÁCH GỌI API: Dùng Axios lấy danh sách môn thi khi vừa mở trang lên
  useEffect(() => {
    // Tạm thời lấy dữ liệu mẫu từ một API công khai, bạn có thể đổi link của nhóm khi BE làm xong
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6') 
      .then(response => {
        // Giả lập map dữ liệu API thành danh sách môn học
        const mockSubjects = response.data.map(item => ({
          id: item.id,
          name: item.id === 1 ? 'Kiểm thử phần mềm' : item.id === 2 ? 'Xây dựng phần mềm Web' : item.id === 3 ? 'Lập trình C++' : `Môn học chuyên ngành ${item.id}`,
          duration: '45 phút',
          totalQuestions: 40
        }));
        setSubjects(mockSubjects);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // 📌 LOGIC LỌC DATA (FILTER): Tìm kiếm môn học dựa trên từ khóa gõ vào
  const filteredSubjects = subjects.filter(subject => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      subject.name.toLowerCase().includes(term) ||
      subject.duration.toLowerCase().includes(term) ||
      subject.totalQuestions.toString().includes(term) ||
      subject.id.toString().includes(term)
    );
  });

  // 📌 LOGIC SẮP XẾP DATA (SORT): Sắp xếp mảng đã lọc theo ID
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-dark text-center">
        <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7v10a2 2 0 0 0 2 2h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 7V5a2 2 0 0 0-2-2H7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7h10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        DANH SÁCH MÔN THI TRẮC NGHIỆM
      </h2>
      {/* Thanh Công Cụ: Chứa ô Lọc và Nút Sắp Xếp */}
      <div className="row g-3 mb-4 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">🔎</span>
            <input 
              type="text" 
              className="form-control rounded-pill ps-0" 
              placeholder="Gõ từ khóa để lọc tìm môn học..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <button 
            className="btn btn-outline-secondary w-100 rounded-pill fw-medium"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
          </button>
        </div>
      </div>

      {/* Hiển thị danh sách môn học dưới dạng Card */}
      <div className="row g-4">
        {sortedSubjects.map(subject => (
          <div className="col-md-4" key={subject.id}>
            <div className="subject-card h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="subject-badge">Mã #{subject.id}</span>
                <span className="text-muted small">{subject.duration}</span>
              </div>
              <h4 className="subject-title mb-2">{subject.name}</h4>
              <p className="subject-meta">📝 <b>{subject.totalQuestions}</b> câu - Đề mẫu có sẵn</p>
              <div className="mt-3 d-flex justify-content-center">
                <button 
                  onClick={() => navigate(`/quiz/${subject.id}`)}
                  className="primary-btn"
                  style={{ width: 'auto', minWidth: '160px' }}
                >
                  <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  &nbsp;Bắt đầu làm bài
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectList;