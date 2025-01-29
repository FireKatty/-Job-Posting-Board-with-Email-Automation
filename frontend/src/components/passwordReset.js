// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const API_BASE = "http://localhost:9876/api";

// // Styled components
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f9f9f9;
//   min-height: 100vh;
//   background: url("bg.jpg");
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
// `;

// const Title = styled.h2`
//   margin-bottom: 20px;
//   color: white;
//   text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   width: 100%;
//   max-width: 400px;
//   padding: 20px;
//   background-color: rgba(255, 255, 255, 0.8);
//   border-radius: 10px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const Input = styled.input`
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   &:focus {
//     outline: none;
//     border-color: #007bff;
//     box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
//   }
// `;

// const Button = styled.button`
//   padding: 10px;
//   font-size: 16px;
//   color: #fff;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const Message = styled.p`
//   margin-top: 15px;
//   font-size: 18px;
//   color: ${(props) => (props.success ? "green" : "red")};
// `;

// function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState({});
//   const [success, setSuccess] = useState(false);
//   const [resendTimer, setResendTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Initially, button is enabled
//   const [timer, setTimer] = useState(60); // Countdown timer starting from 60 seconds

//   const navigate = useNavigate();

//   useEffect(() => {
//     let timer;
//     if (otpSent && resendTimer > 0) {
//       timer = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (resendTimer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(timer);
//   }, [otpSent, resendTimer]);

//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(""), 5000);
//   };

//   const showMessages = (msg) => {
//     setMessages(msg);
//     setTimeout(() => setMessages({}), 5000);
//   };

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       showMessage("Please enter a valid email.");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE}/auth/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setOtpSent(true);
//         setResendTimer(60);
//         setCanResend(false);
//         showMessages({ OTP: "OTP sent to your email!" });
//         setSuccess(true);
//       } else {
//         showMessage(data.message || "Error sending OTP");
//         setSuccess(false);
//       }
//     } catch (error) {
//       showMessage("Server error. Please try again later.");
//       setSuccess(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!canResend) return;
//     try {
//       const response = await fetch(`${API_BASE}/auth/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setOtpSent(true);
//         setResendTimer(60);
//         setCanResend(false);
//         showMessages({ REOTP: "OTP resent to your email!" });
//         setSuccess(true);
//       } else {
//         showMessage(data.message || "Error sending OTP");
//         setSuccess(false);
//       }
//     } catch (error) {
//       showMessage("Server error. Please try again later.");
//       setSuccess(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       showMessages({REOTP:"Please enter a valid OTP."});
//       return;
//     }

//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       showMessages({ Invalid: "8+ chars, 1 uppercase & special char." });
//       return;
//     }

//     if (password !== confirmPassword) {
//       showMessages({ Confirm: "Passwords do not match." });
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE}/auth/reset-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         showMessage("Password reset successfully!");
//         setSuccess(true);
//         setTimeout(() => {
//           navigate('/');
//         }, 4000); // 6000ms = 6 seconds
//       } else {
//         showMessage(data.message || "Failed to reset password");
//         setSuccess(false);
//       }
//     } catch (error) {
//       showMessage("Server error. Please try again later.");
//       setSuccess(false);
//     }

//     setEmail("");
//     setOtp("");
//     setPassword("");
//     setConfirmPassword("");
//     setOtpSent(false);
//   };

//   const handleButtonClick = () => {
//     if (isButtonDisabled) return; // Prevent further clicks if button is disabled
    
//     // Disable the button and start the countdown
//     setIsButtonDisabled(true);
//     handleResetPassword(); // Simulate the data sending operation (like sending OTP)
    
//     let countdown = 60;

//     // Start a countdown timer
//     const countdownInterval = setInterval(() => {
//       setTimer((prev) => {
//         countdown--;
//         if (countdown <= 0) {
//           clearInterval(countdownInterval);
//           setIsButtonDisabled(false); // Re-enable the button after 1 minute
//         }
//         return countdown;
//       });
//     }, 1000);
//   };

//   return (
//     <Container>
//       <Title>Forgot Password</Title>
//       <Form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
//         {!otpSent ? (
//           <>
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <Button 
//               type="submit" 
//               disabled={isButtonDisabled} 
//               onClick={handleButtonClick}
//             >
//             {isButtonDisabled ? `Wait for ${timer}s` : 'Send OTP'}
//             </Button>
//             {/* <Button type="submit">Send OTP</Button> */}
//           </>
//         ) : (
//           <>
//             {messages.OTP && <Message success>{messages.OTP}</Message>}
//             <div style={{ position: "relative", display: "inline-block" }}>
//               <Input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//               <Button
//                 type="button"
//                 onClick={handleResendOtp}
//                 disabled={!canResend}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   opacity: canResend ? 1 : 0.5,
//                 }}
//               >
//                 {canResend ? "Resend OTP" : `${resendTimer}s`}
//               </Button>
//             </div>
//             {messages.REOTP && <Message success>{messages.REOTP}</Message>}
//             <Input
//               type="password"
//               placeholder="Enter New Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {messages.Invalid && <Message>{messages.Invalid}</Message>}
//             <Input
//               type="password"
//               placeholder="Confirm New Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             {messages.Confirm && <Message>{messages.Confirm}</Message>}
//             <Button type="submit">Reset Password</Button>
//           </>
//         )}
//         {message && <Message success={success}>{message}</Message>}
//       </Form>
//     </Container>
//   );
// }

// export default ForgotPassword;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://job-posting-board-with-email-automation-lr7m.onrender.com/api";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  background: url("bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color:rgb(131, 78, 78);
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: ${(props) => (props.success ? "green" : "red")};
`;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Initially, button is enabled
  const [timer, setTimer] = useState(60); // Countdown timer starting from 60 seconds

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const showMessages = (msg) => {
    setMessages(msg);
    setTimeout(() => setMessages({}), 5000);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      showMessage("Please enter a valid email.");
      return;
    }
    if (isButtonDisabled) return; // Prevent button from being clicked again

    setIsButtonDisabled(true); // Disable button while making the request
    try {
      const response = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setResendTimer(60);
        setCanResend(false);
        showMessages({ OTP: "OTP sent to your email!" });
        setSuccess(true);
      } else {
        showMessage(data.message || "Error sending OTP");
        setSuccess(false);
      }
    } catch (error) {
      showMessage("Server error. Please try again later.");
      setSuccess(false);
    }
    setIsButtonDisabled(false); // Re-enable button after the request
  };

  const handleResendOtp = async () => {
    if (!canResend) return; // Prevent resending if cooldown hasn't ended
    try {
      const response = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setResendTimer(60);
        setCanResend(false);
        showMessages({ REOTP: "OTP resent to your email!" });
        setSuccess(true);
      } else {
        showMessage(data.message || "Error sending OTP");
        setSuccess(false);
      }
    } catch (error) {
      showMessage("Server error. Please try again later.");
      setSuccess(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      showMessages({ REOTP: "Please enter a valid OTP." });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      showMessages({ Invalid: "8+ chars, 1 uppercase & special char." });
      return;
    }

    if (password !== confirmPassword) {
      showMessages({ Confirm: "Passwords do not match." });
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await response.json();
      if (response.ok) {
        showMessage("Password reset successfully!");
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 4000); // Redirect after 4 seconds
      } else {
        showMessage(data.message || "Failed to reset password");
        setSuccess(false);
      }
    } catch (error) {
      showMessage("Server error. Please try again later.");
      setSuccess(false);
    }

    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setOtpSent(false);
  };

  return (
    <Container>
      <Title>Forgot Password</Title>
      <Form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
        {!otpSent ? (
          <>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              disabled={isButtonDisabled}
              onClick={handleSendOtp}
            >
              {isButtonDisabled ? `Wait for ${timer}s` : 'Send OTP'}
            </Button>
          </>
        ) : (
          <>
            {messages.OTP && <Message success>{messages.OTP}</Message>}
            <div style={{ position: "relative", display: "inline-block" }}>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: canResend ? 1 : 0.5,
                }}
              >
                {canResend ? "Resend OTP" : `${resendTimer}s`}
              </Button>
            </div>
            {messages.REOTP && <Message success>{messages.REOTP}</Message>}
            <Input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {messages.Invalid && <Message>{messages.Invalid}</Message>}
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {messages.Confirm && <Message>{messages.Confirm}</Message>}
            <Button type="submit">Reset Password</Button>
          </>
        )}
        {message && <Message success={success}>{message}</Message>}
      </Form>
    </Container>
  );
}

export default ForgotPassword;
