const Company  = require("../models/companySchema");
const Otp = require('../models/otpSchema');
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../nodemailer/transporter")


// Routes

// Registration
const signup = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  // console.log(req.body)
  
  try {
    // Check if the email is already registered and verified
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      if (existingCompany.isVerified) {
        return res.status(400).send({ message: 'Email is already registered and verified Please Login' });
      } else {
        return res.status(400).send({ message: 'Email is already registered but not verified. Please verify your email first.' });
      }
    }
    

    // Hash the password and create a new company object
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = new Company({ name, email, password: hashedPassword, mobile });
    // console.log(company)
    await company.save();

   // Send verification email
   const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
   const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
  //  console.log(verificationLink,verificationToken)
  console.log(company)
   await transporter.sendMail({
     from: process.env.EMAIL_USER,
     to: email,
     subject: 'Verify Your Email',
     html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
   });
    console.log(company)

    res.status(201).send({ message: 'Registration successful. Check your email for verification.' });
  } catch (error) {
    res.status(500).send({ message: 'Registration failed', error });
  }
};



// Email Verification
const verify_Email = async (req, res) => {
  console.log("verify Email")
  const { token } = req.query;
  // console.log(token)

  if (!token) {
    return res.status(400).send({ message: 'Token is required.' });
  }

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true } // Returns the updated document
    );

    if (!company) {
      return res.status(404).send({ message: 'Company not found or already verified.' });
    }

    res.send({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying email:', error.message);
    res.status(400).send({ message: 'Invalid or expired token.' });
  }
};

// Login
// const login =  async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body)

//   try {
//     const company = await Company.findOne({ email });
//     if (!company) return res.status(404).send({ message: 'Company not found' });
//     if (!company.isVerified) return res.status(401).send({ message: 'Verify your email first' });

//     const isPasswordValid = await bcrypt.compare(password, company.password);
//     if (!isPasswordValid) return res.status(401).send({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.cookie('token', token, { httpOnly: true }).send({ message: 'Login successful' });
//   } catch (error) {
//     res.status(500).send({ message: 'Login failed', error });
//   }
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).send({ message: 'Company not found' });
    if (!company.isVerified) return res.status(401).send({ message: 'Verify your email first' });

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) return res.status(401).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set the cookie with additional options for security and accessibility
    res.cookie('token', token, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript (prevents XSS attacks)
      secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS only in production
      sameSite: 'None', // Prevents cookie from being sent in cross-site requests
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expiration time (1 day)
    });

    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send({ message: 'Login failed', error });
  }
};

// Send OTP 
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Remove any existing OTP for this email
    await Otp.findOneAndDelete({ email });

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Hash the OTP before saving to the database
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    // Set OTP expiration time (5 minutes from now)
    const expiryTime = Date.now() + 5 * 60 * 1000;

    // Save the new OTP record in the database
    const newOtp = new Otp({
      email,
      otp: hashedOtp,
      expiry: expiryTime,
    });
    await newOtp.save();

    // Send the OTP via email using nodemailer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP For Password Reset',
      html: `
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <br />
        <p>Thank you,</p>
        <p>Your Application Team</p>
      `,
    });

    // Respond with a success message
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP.', error });
  }
};


// Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    // Find the OTP record for the provided email
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({ message: 'Invalid OTP or email.' });
    }

    // Check if OTP has expired
    const currentTime = Date.now();
    if (currentTime > otpRecord.expiry) {
      await Otp.deleteOne({ email }); // Clean up expired OTP
      return res.status(410).json({ message: 'OTP has expired.' });
    }

    // Verify the OTP
    const isMatch = await bcrypt.compare(otp, otpRecord.otp);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid OTP.' });
    }

    // OTP is valid; delete the record after successful verification
    await Otp.deleteOne({ email });

    return res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  // Validate input fields
  if (!email || !otp || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Find the OTP record associated with the email
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // // Check if the OTP has expired
    // if (otpRecord.expiry < Date.now()) {
    //   await Otp.deleteOne({ email }); // Remove expired OTP from the database
    //   return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    // }

    // Verify the OTP
    const isOtpValid = await bcrypt.compare(otp.toString(), otpRecord.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const user = await Company.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Remove the OTP record after successful password reset
    await Otp.deleteOne({ email });

    // Respond with a success message
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'An error occurred while resetting the password.', error });
  }
};


const logout = (req, res) => {
  res
    .clearCookie('token', { httpOnly: true, sameSite: 'Strict' }) // Clear the token cookie securely
    .status(200) // Set HTTP status code for success
    .send({ message: 'Logged out successfully' }); // Send a success message
};

module.exports = { signup, verify_Email, login, sendOtp, verifyOtp , resetPassword ,logout };

