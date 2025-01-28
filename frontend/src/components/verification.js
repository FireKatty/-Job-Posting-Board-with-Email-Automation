import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
const API_BASE = 'https://job-posting-board-with-email-automation-lr7m.onrender.com/api';
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [redirect, setRedirect] = useState(false); // State to control redirection

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API_BASE}/auth/verify-email?token=${token}`, {
          method: 'GET',
        });

        if (response.ok) {
          setVerificationStatus('success');
          // After 3 seconds, trigger redirect
          setTimeout(() => {
            setRedirect(true); 
            localStorage.clear(); // Clear any temporary data
          }, 3000); 
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        setVerificationStatus('failed');
      }
    };

    if (token) verifyEmail();
  }, [token]);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  if (verificationStatus === 'success') {
    return <div>Email Verification Successful! You will be redirected shortly...</div>;
  }

  if (verificationStatus === 'failed') {
    return <div>Email verification failed. Please try again or contact support.</div>;
  }

  return <div>Verifying your email...</div>;
};

export default VerifyEmail;