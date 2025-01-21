const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Check Login // middleware function
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId; // maybe we want to use the data of the user like const user = await User.findById(req.userId) then we can use it (i use it in the dashboard)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// POST Create User // Register
const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  if (!email.endsWith("@gmail.com")) {
    return res
      .status(403)
      .json({ message: "Access denied: Unauthorized email domain." });
  }
  try {
    // User is another model (schema) like post
    const user = await User.create({ email, password: hashPassword });
    return res.status(201).json({ message: "User Created", user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "User already in use",
        redirectUrl: "/api/users/login",
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST Login // Check Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // bcrypt is irreversible it just hash the new one and check it
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });
    return res
      .status(200)
      .json({ message: "Login successful", user, redirectUrl: "/dashboard" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET logout
const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

// const getWorkouts =  async (req, res) => {
//   const { id } = req.params;  // Get userId from URL params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "Invalid user ID" });
//   }

//   const workouts = await Workout.find({ userId: id }).sort({ createdAt: -1 });
//   res.status(200).json(workouts);
// };

module.exports = {
  createUser,
  login,
  logout,
  // getWorkouts,
  authMiddleware,
};
