const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config()

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
