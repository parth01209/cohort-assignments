const { Router } = require("express");
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    await User.create({ username, password });
    res.json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  try {
    await User.updateOne(
      { username },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
    res.json("Purchase Complete");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error purchasing course", error: error.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    courses,
  });
});

module.exports = router;
