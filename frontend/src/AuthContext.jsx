import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') || 'guest';
    if (token) {
      return { role, userId: role === 'admin' ? 'ADMIN' : token };
    }
    return { role: 'guest', userId: '' };
  });

  const login = ({ userId, role, token }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuth({ userId, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth({ role: 'guest', userId: '' });
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, isAuthenticated: auth.role !== 'guest', isAdmin: auth.role === 'admin' }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
