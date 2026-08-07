const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ success: false, message: "User no longer exists" });
      }

      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, message: "Token expired" });
      }
      return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
};

module.exports = protect;
