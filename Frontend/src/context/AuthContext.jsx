import { createContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('quoralite_token');
    const storedUser = localStorage.getItem('quoralite_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('quoralite_user');
      }
    }
    setAuthLoading(false);
  }, []);

  const saveSession = (session) => {
    const { token: sessionToken, user: sessionUser } = session;
    localStorage.setItem('quoralite_token', sessionToken);
    localStorage.setItem('quoralite_user', JSON.stringify(sessionUser));
    setToken(sessionToken);
    setUser(sessionUser);
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    saveSession(response);
    return response;
  };

  const register = async (credentials) => {
    const response = await authService.register(credentials);
    saveSession(response);
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore errors from backend logout if not available
    }
    localStorage.removeItem('quoralite_token');
    localStorage.removeItem('quoralite_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout, authLoading, isAuthenticated: Boolean(token && user) }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
