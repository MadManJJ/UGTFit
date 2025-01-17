const express = require("express");
const {
  createUser,
  login,
  logout,
  // getWorkouts,
  authMiddleware
} = require("../controllers/userController.js");

const router = express.Router();

// work at /api/workouts

// POST Create User
router.post("/register", createUser);

// POST Login
router.post("/login", login);

// GET Logout
router.get("/logout", logout);

// GET workout from userID
// router.get("/:id/workouts", authMiddleware, getWorkouts);

module.exports = router;
