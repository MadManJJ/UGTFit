const Workout = require("../models/workoutModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId; // maybe we want to use the data of the user like const user = await User.findById(req.userId) then we can use it (i use it in the dashboard)
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

// get all workouts
const getWorkouts = async (req, res) => {
  const { sortBy = "createdAt", order = "desc" } = req.query;
  const sortOrder = order === "asc" ? 1 : -1;
  const sortQuery = { [sortBy]: sortOrder };

  const workouts = await Workout.find({}).sort(sortQuery);

  res.status(200).json(workouts);
};

// get a single workout
const get1Workout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // if id is not valid (not a mongodb id)
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const getWorkoutByUserId = async (req, res) => {
  const { userId } = req.params;
  const { sortBy = "createdAt", order = "desc" } = req.query;
  const sortOrder = order === "asc" ? 1 : -1;
  const sortQuery = { [sortBy]: sortOrder };

  try {
    // Check if the userId exists in the Users collection
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all workouts with the matching userId
    const workouts = await Workout.find({ userId }).sort(sortQuery);

    // Even if no workouts are found, return a 200 response with an empty array
    return res.status(200).json({
      message: "Workouts retrieved successfully",
      user: {
        id: userExists._id,
        name: userExists.name, // Include additional user details if needed
      },
      workouts: workouts || [],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving workouts.", error: error.message });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  console.log("TEST");
  const { title, load, reps, userId, imageUrl } = req.body;

  let emptyFields = [];

  if (!title) {
    console.log("no title");
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  if (!userId) {
    return res.status(400).json({ error: "No UserId provided" });
  }
  // add doc to db
  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
      userId,
      imageUrl,
    });
    res.status(200).json({ message: "Workout created successfully", workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // if id is not valid (not a mongodb id)
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // if id is not valid (not a mongodb id)
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // ... is to spread the object
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const getWorkoutsByReps = async (req, res) => {
  try {
    const rankings = await Workout.aggregate([
      {
        $group: {
          _id: "$userId", // Group by userId
          totalReps: { $sum: "$reps" }, // Sum all reps for each user
        },
      },
      {
        $sort: { totalReps: -1 }, // Sort by totalReps in descending order
      },
      {
        $lookup: {
          // Join with the user collection to get user email
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          // Return only the necessary fields
          totalReps: 1,
          user: { $arrayElemAt: ["$user.email", 0] }, // Extract the first user email
        },
      },
    ]);
    res.status(200).json(rankings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reps rankings", error });
  }
};

const getWorkoutsByLoad = async (req, res) => {
  try {
    const rankings = await Workout.aggregate([
      {
        $group: {
          _id: "$userId", // Group by userId
          totalLoad: { $sum: "$load" }, // Sum all loads for each user
        },
      },
      {
        $sort: { totalLoad: -1 }, // Sort by totalLoad in descending order
      },
      {
        $lookup: {
          // Join with the user collection to get user email
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          // Return only the necessary fields
          totalLoad: 1,
          user: { $arrayElemAt: ["$user.email", 0] }, // Extract the first user email
        },
      },
    ]);
    res.status(200).json(rankings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching load rankings", error });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  get1Workout,
  deleteWorkout,
  updateWorkout,
  getWorkoutByUserId,
  authMiddleware,
  getWorkoutsByReps,
  getWorkoutsByLoad,
};
