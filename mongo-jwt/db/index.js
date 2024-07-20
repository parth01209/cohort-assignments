const mongoose = require("mongoose");

// Connection to Database
mongoose.connect(
  "mongodb+srv://parthprabhune12:admin@course-assignment.6nwojfg.mongodb.net/course_app2"
);

// Defining Schema
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Admin = mongoose.model("Admin", AdminSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const User = mongoose.model("User", UserSchema);

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
