import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const api = useApi();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.post('/auth/login', { username, password });
      login(data.token);
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      <div className="auth-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
