const Company  = require("../models/companySchema");
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
const login =  async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).send({ message: 'Company not found' });
    if (!company.isVerified) return res.status(401).send({ message: 'Verify your email first' });

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) return res.status(401).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS required)
      sameSite: 'None', // Required for cross-origin cookies
    });
  } catch (error) {
    res.status(500).send({ message: 'Login failed', error });
  }
};

const logout = (req, res) => {
  res
    .clearCookie('token', { httpOnly: true, sameSite: 'Strict' }) // Clear the token cookie securely
    .status(200) // Set HTTP status code for success
    .send({ message: 'Logged out successfully' }); // Send a success message
};

module.exports = { signup, verify_Email, login, logout };

