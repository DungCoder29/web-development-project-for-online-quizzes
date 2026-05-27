import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';

// ── Routes của nhóm (teammates) ──────────────────────────────────────────
import Subjects from './Subjects';
import ExamRoom from './ExamRoom';
import Results from './Results';
import Layout from './Layout';
import RequireAuth from './RequireAuth';

// ── Admin pages (phần của Tri) ────────────────────────────────────────────
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import UserList from './UserList';
import AdminSubjectList from './AdminSubjectList';
import AdminQuestionList from './AdminQuestionList';
import AdminSettings from './AdminSettings';
import { AuthProvider, useAuth } from './AuthContext';

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return isAdmin ? children : <Navigate to="/subjects" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 1. TRANG ĐỨNG ĐỘC LẬP */}
          <Route path="/" element={<Login />} />

          {/* 2. CÁC TRANG SINH VIÊN (Layout có thanh Menu) */}
          <Route element={<RequireAuth><Layout /></RequireAuth>}>
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/exam/:id" element={<ExamRoom />} />
            <Route path="/results" element={<Results />} />
          </Route>

          {/* 3. ADMIN — Dùng AdminLayout riêng (có sidebar) */}
          <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="/admin"           element={<AdminDashboard />} />
            <Route path="/admin/users"     element={<UserList />} />
            <Route path="/admin/subjects"  element={<AdminSubjectList />} />
            <Route path="/admin/questions" element={<AdminQuestionList />} />
            <Route path="/admin/settings"  element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;