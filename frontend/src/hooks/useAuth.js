import { useState } from 'react';
import api from '../api';

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (studentId, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/login', { studentId, password });
      const { token } = res.data || {};

      if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        // Fallback when backend is unavailable or returns no token
        const fallbackToken = 'local-dev-token';
        localStorage.setItem('token', fallbackToken);
        api.defaults.headers.common.Authorization = `Bearer ${fallbackToken}`;
      }

      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      const message = err?.response?.data?.message || err.message || 'Lỗi kết nối';
      setError(message);

      // If backend is not reachable, allow local login with a fallback token
      if (!err?.response) {
        const fallbackToken = 'local-dev-token';
        localStorage.setItem('token', fallbackToken);
        api.defaults.headers.common.Authorization = `Bearer ${fallbackToken}`;
        return { token: fallbackToken };
      }

      throw err;
    }
  };

  const forgotPassword = async (studentId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/forgot-password', { studentId });
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      const message = err?.response?.data?.message || err.message || 'Lỗi kết nối';
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
  };

  return { login, forgotPassword, logout, loading, error };
}
