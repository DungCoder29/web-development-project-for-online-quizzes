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
      // Expect backend to return { token: '...' }
      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
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

  return { login, logout, loading, error };
}
