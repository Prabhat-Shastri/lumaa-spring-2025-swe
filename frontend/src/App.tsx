import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import ProtectedRoute from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </>
  );
};

export default App;
