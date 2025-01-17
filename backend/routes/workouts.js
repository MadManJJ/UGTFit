const express = require("express");
const {
  createWorkout,
  getWorkouts,
  get1Workout,
  deleteWorkout,
  updateWorkout,
  getWorkoutByUserId
} = require("../controllers/workoutController");

const router = express.Router();

// work at /api/workouts

// GET all workouts : call at /api/workouts/
router.get("/", getWorkouts);

// GET a single workout : call at /api/workouts/:id
router.get("/:id", get1Workout);

// GET workouts by userId : call at /api/workouts/user/:userId
router.get("/user/:userId", getWorkoutByUserId);

// POST a new workout : call at /api/workouts/
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
