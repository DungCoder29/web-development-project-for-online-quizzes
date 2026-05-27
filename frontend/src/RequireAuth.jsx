import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  // Simple client-side check: token presence in localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // Not authenticated -> redirect to login
    return <Navigate to="/" replace />;
  }

  // Authenticated -> render children routes
  return children;
}
