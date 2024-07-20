const { Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function adminMiddleware(req, res, next) {
  // Auth logic here
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const words = token.split(" ");
  const jwtToken = words[1];
  const decoded = jwt.verify(jwtToken, JWT_SECRET);
  if (decoded.username) {
    next();
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
}

module.exports = adminMiddleware;
