const express = require("express");
const {
  createUser,
  login,
  logout,
  authMiddleware,
  checkAuthStatus,
} = require("../controllers/userController.js");

const router = express.Router();

// work at /api/workouts

// POST Create User
router.post("/register", createUser);

// POST Login
router.post("/login", login);

// GET Logout
router.get("/logout", logout);

// Check Login
router.get("/auth/check", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Authorized", userId: req.userId });
});

// GET workout from userID
// router.get("/:id/workouts", authMiddleware, getWorkouts);

module.exports = router;
