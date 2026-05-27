import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ role: 'guest', userId: '' });

  const login = ({ userId, role }) => {
    setAuth({ userId, role });
  };

  const logout = () => {
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
