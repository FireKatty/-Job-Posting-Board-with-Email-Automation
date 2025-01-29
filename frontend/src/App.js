// import React from 'react';
// import { BrowserRouter as Router, Route, Routes,  Navigate } from 'react-router-dom';
// import ForgotPassword from './components/passwordReset';
// import Login from "./components/login"
// import VerifyEmail from './components/verification';
// import './App.css';
// const App = () => {


//   return (
//     <Router>
//       <Routes>
       
//        <Route path='/' element={<Login/>}/>
       
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import PostJob from './components/jobPosting';
import PrivateRoute from './ProtectRoutes/ProtectedRoute';
import VerifyEmail from './components/verification';
import ForgotPassword from './components/passwordReset';
import './App.css';

const App = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage

  return (
    <Router>
      <Routes>
        {/* Redirect to post-job if user is logged in, otherwise show Login */}
        <Route path="/" element={user ? <Navigate to="/post-job" replace /> : <Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Route for PostJob */}
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
