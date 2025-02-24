import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Task Manager</h1>
        <p className="home-description">
          A simple and efficient way to organize your daily tasks. Keep track of your
          to-dos, mark them complete, and stay productive.
        </p>
        <div className="home-features">
          <div className="feature-item">
            <h3>✓ Create Tasks</h3>
            <p>Easily add new tasks with titles and descriptions</p>
          </div>
          <div className="feature-item">
            <h3>⚡ Track Progress</h3>
            <p>Mark tasks as complete as you finish them</p>
          </div>
          <div className="feature-item">
            <h3>📝 Edit Anytime</h3>
            <p>Update task details whenever needed</p>
          </div>
        </div>
        {!token ? (
          <div className="home-cta">
            <Link to="/register" className="cta-button primary">Get Started</Link>
            <Link to="/login" className="cta-button secondary">Login</Link>
          </div>
        ) : (
          <div className="home-cta">
            <Link to="/tasks" className="cta-button primary">Go to Tasks</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 