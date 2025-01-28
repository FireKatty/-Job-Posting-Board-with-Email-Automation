const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/protectRoutes")

const { postJob } = require("../controllers/jobPostingController")

// Define the routes

router.post('/jobs', authenticateToken,postJob);

module.exports = router;