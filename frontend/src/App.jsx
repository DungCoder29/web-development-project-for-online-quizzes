import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SubjectList from './SubjectList';
import Quiz from './Quiz';
import UserList from './UserList';
import Layout from './Layout'; // Import Layout vừa tạo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 1. TRANG ĐỨNG ĐỘC LẬP (Không có thanh Menu) */}
        <Route path="/" element={<Login />} />
        
        {/* 2. CÁC TRANG NẰM TRONG LAYOUT (Có thanh Menu và Footer) */}
        <Route element={<Layout />}>
          <Route path="/subjects" element={<SubjectList />} />
          <Route path="/quiz/:subjectId" element={<Quiz />} />
          
          {/* Nếu bạn vẫn còn giữ file UserList.jsx hôm trước thì mở dòng này */}
          {/* <Route path="/users" element={<UserList />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;