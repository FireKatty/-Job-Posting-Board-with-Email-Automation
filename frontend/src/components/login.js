// import React, { useState,useEffect } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const BackgroundImage = styled.div`
//   background: url('bg.jpg');
//   height: 100vh;
//   background-size: cover;
//   background-position: center;
//   position: relative;

//   &:after {
//     position: absolute;
//     content: '';
//     top: 0;
//     left: 0;
//     height: 100%;
//     width: 100%;
//     background: rgba(0, 0, 0, 0.7);
//   }
// `;

// const Content = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   z-index: 999;
//   text-align: center;
//   padding: 60px 32px;
//   width: 370px;
//   transform: translate(-50%, -50%);
//   background: rgba(255, 255, 255, 0.04);
//   box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
// `;

// const Header = styled.header`
//   color: white;
//   font-size: 33px;
//   font-weight: 600;
//   margin: 0 0 35px 0;
//   font-family: 'Montserrat', sans-serif;
// `;

// const Field = styled.div`
//   position: relative;
//   height: 45px;
//   width: 100%;
//   display: flex;
//   background: rgba(255, 255, 255, 0.94);
//   margin-top: ${(props) => (props.space ? "16px" : "0")};
// `;

// const Icon = styled.span`
//   color: #222;
//   width: 40px;
//   line-height: 45px;
// `;

// const Input = styled.input`
//   height: 100%;
//   width: 100%;
//   background: transparent;
//   border: none;
//   outline: none;
//   color: #222;
//   font-size: 16px;
//   font-family: 'Poppins', sans-serif;
// `;

// const ShowButton = styled.span`
//   position: absolute;
//   right: 13px;
//   font-size: 16px;
//   color: #222;
//   cursor: pointer;
//   font-family: 'Montserrat', sans-serif;
//   display: ${(props) => (props.show ? "block" : "none")};

//   i {
//     font-size: 16px;
//   }
// `;

// // const PasswordLink = styled.div`
// //   text-align: left;
// //   margin: 10px 0;

// //   a {
// //     color: white;
// //     text-decoration: none;
// //     font-family: 'Poppins', sans-serif;

// //     &:hover {
// //       text-decoration: underline;
// //     }
// //   }
// // `;

// const SubmitButton = styled(Input)`
//   height: 45px;
//   width: 100%;
//   display: flex;
//   margin-top:20px;
//   background: #3498db;
//   border: 1px solidrgb(6, 40, 63);
//   color: white;
//   font-size: 18px;
//   letter-spacing: 1px;
//   font-weight: 600;
//   cursor: pointer;
//   font-family: 'Montserrat', sans-serif;

//   &:hover {
//     background: #2691d9;
//   }
// `;

// // const LoginText = styled.div`
// //   color: white;
// //   margin: 20px 0;
// //   font-family: 'Poppins', sans-serif;
// // `;

// // const SocialLinks = styled.div`
// //   display: flex;
// //   margin: 0 0 20px 0;
// // `;

// // const SocialButton = styled.div`
// //   width: 100%;
// //   height: 45px;
// //   line-height: 45px;
// //   margin-left: ${(props) => (props.first ? "0" : "10px")};
// //   background: ${(props) => (props.type === "facebook" ? "#4267B2" : "#E1306C")};
// //   border: 1px solid ${(props) => (props.type === "facebook" ? "#3e61a8" : "#df2060")};
// //   cursor: pointer;
// //   color: white;
// //   text-align: center;

// //   &:hover {
// //     background: ${(props) => (props.type === "facebook" ? "#3e61a8" : "#df2060")};
// //   }

// //   i {
// //     font-size: 17px;

// //     span {
// //       margin-left: 8px;
// //       font-weight: 500;
// //       letter-spacing: 1px;
// //       font-size: 16px;
// //       font-family: 'Poppins', sans-serif;
// //     }
// //   }
// // `;

// const SignupText = styled.div`
//   margin-top: 10px;
//   font-size: 15px;
//   color: white;
//   font-family: 'Poppins', sans-serif;

//   a {
//     color: #3498db;
//     text-decoration: none;

//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const ErrorText = styled.div`
//   color: red;
//   font-size: 14px;
//   margin-top: 10px;
// `;


// const App = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",

//   });
//   const [error, setError] = useState(null);  // Error state
//   const [loading, setLoading] = useState(false);  // Loading state
//   const navigate = useNavigate();

//    // Reset form data when toggling between Login and Signup
//    useEffect(() => {
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//     setError('');
//     }, [isLogin]);

//   const toggleForm = () => setIsLogin(!isLogin);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);  // Reset error message before submitting
//     const url = isLogin ? "http://localhost:9876/api/auth/login" : "http://localhost:9876/api/auth/register";
//     const payload = isLogin
//       ? { email: formData.email, password: formData.password }
//       : formData;

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await response.json();
      

//       if (!response.ok) {
//         // console.log(result)
//         setError(result.error || "An error occurred");
//       } else {
//         console.log(result)
//         localStorage.setItem("user", JSON.stringify(result));
//         navigate("/post-job");
//       }
//     } catch (error) {
//       setError("Failed to connect to server.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <BackgroundImage>
//       <Content>
//         <Header>{isLogin ? "Login Form" : "Signup Form"}</Header>
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <Field>
//               <Icon className="fa fa-user" />
//               <Input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Full Name"
//               />
//             </Field>
//           )}
//           <Field space>
//             <Icon className="fa fa-envelope" />
//             <Input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Email"
//             />
//           </Field>
          
//           <Field space>
//             <Icon className="fa fa-lock" />
//             <Input
//               type={passwordVisible ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Password"
//             />
//             <ShowButton
//               show
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               <i className={passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"} />
//             </ShowButton>
//           </Field>
//           {!isLogin && (
//             <><Field space>
//                           <Icon className="fa fa-lock" />
//                           <Input
//                               type={passwordVisible ? "text" : "password"}
//                               name="confirmPassword"
//                               value={formData.confirmPassword}
//                               onChange={handleChange}
//                               required
//                               placeholder="Confirm Password" />
//                       </Field><Field space>
//                               <Icon className="fa fa-phone" />
//                               <Input
//                                   type="tel"
//                                   name="phone"
//                                   value={formData.phone}
//                                   onChange={handleChange}
//                                   required
//                                   placeholder="Phone Number" />
//                           </Field></>
          
//           )}
//           {/* {!isLogin && <div style={{ marginBottom: "16px" }}></div>} */}
//           {/* {isLogin && (
//             <PasswordLink>
//               <a href="#">Forgot Password?</a>
//             </PasswordLink>
//           )} */}
        
//             <SubmitButton type="submit" value={isLogin ? "LOGIN" : "SIGNUP"} />
          
//         </form>
//         {error && <ErrorText>{error}</ErrorText>}
//         {loading && <p style={{ color: "white" }}>Processing...</p>}
//         <SignupText>
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <a href="#" onClick={toggleForm}>
//             {isLogin ? "Signup Now" : "Login Now"}
//           </a>
//         </SignupText>
//       </Content>
//     </BackgroundImage>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const API_BASE = 'https://job-posting-board-with-email-automation-ovws.onrender.com/api/auth';

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
  color: red;
  font-size: 14px;
  margin-top: 10px;
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
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError(null); // Reset error when toggling between login/signup
  }, [isLogin]);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before submitting
    const url = isLogin ? `${API_BASE}/login` : `${API_BASE}/register`;
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
  
      if (!response.ok) {
        // Handle registration errors
        if (result.message === 'Email is already registered but not verified. Please verify your email first.') {
          setError("You are already registered. Please verify your email first.");
        } else {
          setError(result.message || "An error occurred");
        }
      } else {
        // Successful registration
        setError(null);
        localStorage.setItem("user", JSON.stringify(result));
  
        // Display success message or direct user to verify email
        if (!isLogin) {
          setError("Registration successful. Please check your email for verification.");
        }
  
        // If login is successful and email is verified
        if (isLogin && result.isVerified) {
          navigate("/post-job");
        } else {
          setError("Please verify your email before logging in.");
        }
      }
    } catch (error) {
      setError("Failed to connect to the server.");
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
              </Field>
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
            </>
          )}
          <SubmitButton type="submit" value={isLogin ? "LOGIN" : "SIGNUP"} />
        </form>
        {error && <ErrorText>{error}</ErrorText>} {/* Render error message if any */}
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

