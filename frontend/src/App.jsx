import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SubjectList from './SubjectList';
import Quiz from './Quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Lần đầu vào web (/) sẽ thấy trang Đăng nhập */}
        <Route path="/" element={<Login />} />
        
        {/* Đăng nhập xong sẽ chuyển qua trang danh sách môn học */}
        <Route path="/subjects" element={<SubjectList />} />
        
        {/* Chọn môn xong sẽ vào phòng thi của môn đó kèm theo ID môn học */}
        <Route path="/quiz/:subjectId" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;