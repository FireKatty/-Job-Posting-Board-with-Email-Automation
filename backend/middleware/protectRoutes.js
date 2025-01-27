const jwt = require ("jsonwebtoken");
// const User = require("../models/userLogin");

// const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.headers["authorization"];

// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
// 		}

// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 		}
// 		next();

// 	} catch (error) {
// 		console.log("Error in protectRoute middleware: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };
// Middleware for Authentication

const authenticateToken = (req, res, next) => {
	// console.log(req.cookies)
	const token = req.cookies.token;
	// console.log(token)

	if (!token) return res.status(401).send({ message: 'Unauthorized' });
  
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
	  if (err) return res.status(403).send({ message: 'Forbidden' });
	  req.user = user;
	  next();
	});
};
  

module.exports =  authenticateToken;


