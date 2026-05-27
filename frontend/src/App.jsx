import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Subjects from './Subjects';
import ExamRoom from './ExamRoom';
import Results from './Results';
import Admin from './Admin';
import Layout from './Layout';
import RequireAuth from './RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 1. TRANG ĐỨNG ĐỘC LẬP (Không có thanh Menu) */}
        <Route path="/" element={<Login />} />
        
        {/* 2. CÁC TRANG NẰM TRONG LAYOUT (Có thanh Menu và Footer) */}
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/exam/:id" element={<ExamRoom />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;