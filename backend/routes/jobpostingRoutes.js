const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/protectRoutes")

const { jobPosting } = require("../controllers/jobPostingController")

// Define the routes

router.post('/jobs', authenticateToken,jobPosting);

module.exports = router;