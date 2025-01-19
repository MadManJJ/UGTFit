const express = require("express");
const {
  createWorkout,
  getWorkouts,
  get1Workout,
  deleteWorkout,
  updateWorkout,
  getWorkoutByUserId,
  authMiddleware,
  getWorkoutsByReps,
  getWorkoutsByLoad,
} = require("../controllers/workoutController");

const router = express.Router();

// work at /api/workouts

// GET all workouts : call at /api/workouts/
router.get("/", getWorkouts);

// GET a single workout : call at /api/workouts/:id
router.get("/:id", get1Workout);

// GET workouts by userId : call at /api/workouts/user/:userId
router.get("/user/:userId", authMiddleware, getWorkoutByUserId);

// POST a new workout : call at /api/workouts/
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

// GET workouts by reps : call at /api/workouts/ranking/reps
router.get("/ranking/reps", getWorkoutsByReps);

router.get("/ranking/load", getWorkoutsByLoad);

module.exports = router;
