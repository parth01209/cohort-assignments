const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

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
