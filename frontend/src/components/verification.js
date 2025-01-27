import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState(null);
//   console.log(token)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        
     

        const response = await fetch(`https://job-posting-board-with-email-automation-qyi1.onrender.com/api/auth/verify-email?token=${token}`, {
          method: 'GET',
        });
        // const data = await response.json();
        // console.log(response)
        setVerificationStatus(response.ok ? 'success' : 'failed');
      } catch (error) {
        setVerificationStatus('failed');
      }
    };

    if (token) verifyEmail();
  }, [token]);

  if (verificationStatus === 'success') {
    alert("Email Verification Successful");
    return <Navigate to="/" replace />;
  }

  if (verificationStatus === 'failed') {
    return <div>Email verification failed. Please try again or contact support.</div>;
  }

  return <div>Verifying your email...</div>;
};

export default VerifyEmail;
