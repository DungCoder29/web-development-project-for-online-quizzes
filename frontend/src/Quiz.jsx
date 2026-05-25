import { useParams, useNavigate } from 'react-router-dom';

function Quiz() {
  const { subjectId } = useParams(); // Lấy ID môn học từ đường dẫn URL
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="card shadow border-0 rounded-4 p-5 text-center bg-white">
        <h1 className="display-5 fw-bold text-success mb-3">✍️ PHÒNG THI KỸ THUẬT SỐ</h1>
        <h3 className="text-secondary mb-4">Bạn đang làm bài thi của Môn học có Mã số: <span className="text-primary">#{subjectId}</span></h3>
        
        <div className="alert alert-warning d-inline-block rounded-pill px-4 py-2 fw-semibold" role="alert">
          ⏱ Đồng hồ đếm ngược và Ngân hàng câu hỏi trắc nghiệm sẽ được render tại đây!
        </div>

        <div className="mt-5">
          <button onClick={() => navigate('/subjects')} className="btn btn-outline-secondary rounded-pill px-4 fw-medium">
            ⬅ Rời phòng thi (Quay lại)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;