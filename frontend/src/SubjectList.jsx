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
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📌 LOGIC SẮP XẾP DATA (SORT): Sắp xếp mảng đã lọc theo thứ tự chữ cái A-Z hoặc Z-A
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
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
      <h2 className="fw-bold mb-4 text-dark text-center">📚 DANH SÁCH MÔN THI TRẮC NGHIỆM</h2>
      
      {/* Thanh Công Cụ: Chứa ô Lọc và Nút Sắp Xếp */}
      <div className="row g-3 mb-4 justify-content-center">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control rounded-pill px-4" 
            placeholder="🔍 Gõ từ khóa để lọc tìm môn học..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Kích hoạt bộ lọc tức thì khi gõ
          />
        </div>
        <div className="col-md-3">
          <button 
            className="btn btn-outline-secondary w-100 rounded-pill fw-medium"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} // Đổi chiều sắp xếp
          >
            Sắp xếp: {sortOrder === 'asc' ? 'Sắp xếp A-Z 🔽' : 'Sắp xếp Z-A 🔼'}
          </button>
        </div>
      </div>

      {/* Hiển thị danh sách môn học dưới dạng Card */}
      <div className="row g-4">
        {sortedSubjects.map(subject => (
          <div className="col-md-4" key={subject.id}>
            <div className="card shadow-sm border-0 h-100 rounded-4 hover-shadow transition">
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-primary bg-opacity-10 text-primary mb-2 rounded-pill px-3">Mã môn: #{subject.id}</span>
                  <h4 className="card-title fw-bold text-dark mb-3">{subject.name}</h4>
                  <p className="text-muted mb-1">⏱ Thời gian: <b>{subject.duration}</b></p>
                  <p className="text-muted mb-3">📝 Số câu hỏi: <b>{subject.totalQuestions} câu</b></p>
                </div>
                <button 
                  onClick={() => navigate(`/quiz/${subject.id}`)} // Chuyển trang kèm ID môn
                  className="btn btn-primary w-100 rounded-pill fw-semibold mt-3"
                >
                  Vào Thi Ngay
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