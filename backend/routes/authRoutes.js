const express = require("express");
const router = express.Router();

const { signup, verify_Email, login, logout } = require("../controllers/authController");


// Define the routes

router.post('/register',signup);
router.get('/verify-email',verify_Email);
router.post('/login',login);
router.post("/logout",logout);

module.exports = router;
