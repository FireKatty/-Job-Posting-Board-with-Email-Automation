const express = require("express");
const router = express.Router();

const { signup, verify_Email, login,sendOtp, verifyOtp, resetPassword, logout } = require("../controllers/authController");


// Define the routes

router.post('/register',signup);
router.get('/verify-email',verify_Email);
router.post('/login',login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post("/logout",logout);

module.exports = router;
