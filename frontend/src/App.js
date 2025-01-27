import React from 'react';
import { BrowserRouter as Router, Route, Routes,  Navigate } from 'react-router-dom';
import Login from './components/login';
import PostJob from './components/jobPosting';
import PrivateRoute from './ProtectRoutes/ProtectedRoute';
import './App.css';
const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Redirect to board if user is logged in, else show Login */}
        <Route path="/" element={user ? <Navigate to="/post-job" replace /> : <Login />} />

        {/* Protected Route for Kanban Board */}
        <Route
          path="/post-job"
          element={
            <PrivateRoute>
                <PostJob />
            </PrivateRoute>
          }
        />

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
