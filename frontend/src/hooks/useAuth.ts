import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');

  const login = (token: string) => {
    localStorage.setItem('token', token);
    navigate('/tasks');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = () => !!getToken();

  return {
    getToken,
    login,
    logout,
    isAuthenticated,
  };
}; 