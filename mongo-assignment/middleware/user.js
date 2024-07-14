const { User } = require("../db");

async function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      next();
    } else {
      res.status(401).send("User does not exist");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Authentication error", error: error.message });
  }
}

module.exports = userMiddleware;
