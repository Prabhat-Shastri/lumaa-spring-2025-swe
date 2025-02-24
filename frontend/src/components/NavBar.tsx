import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/NavBar.css';

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      gap: '1.5rem',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      alignItems: 'center'
    }}>
      <Link to="/" style={{
        color: '#333',
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '1.1rem'
      }}>Home</Link>
      {!isAuthenticated() ? (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      ) : (
        <>
          <Link to="/tasks" className="nav-link">Tasks</Link>
          <button onClick={logout} className="logout-button">Logout</button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
