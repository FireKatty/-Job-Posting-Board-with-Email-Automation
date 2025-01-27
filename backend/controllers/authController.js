const Company  = require("../models/companySchema");
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../nodemailer/transporter")


// Routes

// Registration
const signup =  async (req, res) => {
  const { name, email, password, mobile } = req.body;
  console.log(req.body);

  try {
    // console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const company = new Company({ name, email, password: hashedPassword, mobile });
    // console.log(company)
    await company.save();
    // console.log(Company)

    // Send verification email
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    console.log(verificationLink,verificationToken)

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
    });

    res.status(201).send({ message: 'Registration successful. Check your email for verification.' });
  } catch (error) {
    res.status(500).send({ message: 'Registration failed', error });
  }
};

// Email Verification
const verify_Email =  async (req, res) => {
  const { token } = req.query;

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    await Company.findOneAndUpdate({ email }, { isVerified: true });
    res.send({ message: 'Email verified successfully.' });
  } catch (error) {
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
    res.cookie('token', token, { httpOnly: true }).send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send({ message: 'Login failed', error });
  }
};

const logout =  (req, res) => {
  res.clearCookie('token').send({ message: 'Logged out successfully' });
};



module.exports = {signup,verify_Email,login,logout};