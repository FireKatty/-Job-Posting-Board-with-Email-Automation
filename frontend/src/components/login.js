
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const API_BASE = 'https://job-posting-board-with-email-automation-lr7m.onrender.com/api/auth';

const BackgroundImage = styled.div`
  background: url('bg.jpg');
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 60px 32px;
  width: 370px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
`;

const Header = styled.header`
  color: white;
  font-size: 33px;
  font-weight: 600;
  margin: 0 0 35px 0;
  font-family: 'Montserrat', sans-serif;
`;

const Field = styled.div`
  position: relative;
  height: 45px;
  width: 100%;
  display: flex;
  background: rgba(255, 255, 255, 0.94);
  margin-top: ${(props) => (props.space ? "16px" : "0")};
`;

const Icon = styled.span`
  color: #222;
  width: 40px;
  line-height: 45px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #222;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
`;

const ShowButton = styled.span`
  position: absolute;
  right: 13px;
  font-size: 16px;
  color: #222;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  display: ${(props) => (props.show ? "block" : "none")};

  i {
    font-size: 16px;
  }
`;

const SubmitButton = styled(Input)`
  height: 45px;
  width: 100%;
  display: flex;
  margin-top: 20px;
  background: #3498db;
  border: 1px solid rgb(6, 40, 63);
  color: white;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    background: #2691d9;
  }
`;

const SignupText = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: white;
  font-family: 'Poppins', sans-serif;

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.div`
  color: #ff4d4f; /* Bright red for visibility */
  font-size: 0.85rem; /* Slightly smaller font size */
  margin-top: 4px; /* Space between the input and the error */
  margin-left: 8px; /* Align with input padding for consistency */
`;
const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({}); // To store individual field errors
  const [errors, setErrors] = useState({}); // To store individual field errors
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    setError({});
    setErrors({}); // Reset errors when toggling between login/signup
  }, [isLogin]);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, mobile, password, confirmPassword } = formData;
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate mobile number
    const mobileRegex = /^[1-9][0-9]{9}$/; // Ensures 10 digits and does not start with 0
    if (!isLogin && !mobileRegex.test(mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number that does not start with 0.";
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "8+ chars,1 uppercase & special char.";
    }

    // Validate confirm password
    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Stop submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const url = isLogin ? `${API_BASE}/login` : `${API_BASE}/register`;
    const payload = isLogin
      ? { email, password }
      : { name, email, mobile, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", // Include cookies in the request
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.message === "Email is already registered but not verified. Please verify your email first.") {
          setError({ email: "You are already registered. Please verify your email first." });
          setTimeout(() => setError(''), 5000); // Clear message after 5 seconds
        } else {
          setError({ email: result.message || "An error occurred" });
        }
      } else {
        if (isLogin) {
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/post-job");
        } else {
          setError({ email: "Registration successful. Please verify your email." });
          setTimeout(() => setError(''), 5000); // Clear message after 5 seconds
        }
      }
    } catch (error) {
      setError({ email: "Failed to connect to the server." });
      setTimeout(() => setError(''), 5000); // Clear message after 5 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundImage>
      <Content>
        <Header>{isLogin ? "Login Form" : "Signup Form"}</Header>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Field>
              <Icon className="fa fa-user" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
              />
            </Field>
          )}
          <Field space>
            <Icon className="fa fa-envelope" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
          </Field>
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <Field space>
            <Icon className="fa fa-lock" />
            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <ShowButton
              show
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <i className={passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"} />
            </ShowButton>
          </Field>
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          {!isLogin && (
            <>
              <Field space>
                <Icon className="fa fa-lock" />
                <Input
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                />
                {/* {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>} */}
              </Field>
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
              <Field space>
                <Icon className="fa fa-phone" />
                <Input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                />
              </Field>
              {errors.mobile && <ErrorText>{errors.mobile}</ErrorText>}
            </>
          )}
          <SubmitButton type="submit" value={isLogin ? "LOGIN" : "SIGNUP"} />
        </form>
        {error && <ErrorText>{error.email}</ErrorText>} 
        {loading && <p style={{ color: "white" }}>Processing...</p>}
        <SignupText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a href="#" onClick={toggleForm}>
            {isLogin ? "Signup Now" : "Login Now"}
          </a>
        </SignupText>
      </Content>
    </BackgroundImage>
  );
};

export default App;
