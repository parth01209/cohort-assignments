const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, User } = require("../db");
// const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.create({
    username,
    password,
  }).then(function () {
    res.json({
      message: "Admin created",
    });
  });
});

router.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.find({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.json({
      message: "Invalid Credentials",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title,
    description = req.body.description,
    price = req.body.price,
    image = req.body.image;
  const newCourse = await Course.create({
    title,
    description,
    price,
    image,
  });

  res.json({
    message: "Course created",
    courseID: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  res.json(response);
});

module.exports = router;
