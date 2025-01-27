// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const cors = require("cors"); // CORS middleware for handling cross-origin requests
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser'); // dotenv module to load environment variables
const app = express(); // Initialize Express application




app.use(cors({
  origin: 'https://job-posting-board-with-email-automation.vercel.app/', // Specify your frontend URL
  credentials: true, // Allow cookies and credentials
}));

// Middleware
app.use(express.json()); // Automatically parses JSON requests
app.use(cookieParser());

// Load environment variables from .env file
dotenv.config();

// Import the database connection function
const connectToDatabase = require("./db/connectDatabase"); 

// Set up the port to either the one in environment variables or 5432
const PORT = process.env.PORT || 5432; 

// Import route modules for different API endpoints
const authRoutes = require("./routes/authRoutes"); // Routes for authentication-related operations
const jobpostingRoutes = require("./routes/jobpostingRoutes")

// Use routes for their corresponding base URL
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with '/api/auth'
app.use('/api',jobpostingRoutes);



// Health Check
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'OK', message: 'Server is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'An unexpected error occurred' });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    connectToDatabase(); // Establish connection to the database when the server starts

    // Log server start confirmation along with the port number
    console.log("Server is started on port", PORT);
});
