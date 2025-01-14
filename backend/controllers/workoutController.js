const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const { sortBy = 'createdAt', order = 'desc' } = req.query;
  const sortOrder = order === 'asc' ? 1 : -1;
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

// create new workout
const createWorkout = async (req, res) => {
  console.log("TEST")
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
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }
  if(!userId){
    return res.status(400).json({ error: "No UserId provided" });
  }
  // add doc to db
  try {
    const workout = await Workout.create({ title, load, reps, userId, imageUrl });
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

module.exports = {
  createWorkout,
  getWorkouts,
  get1Workout,
  deleteWorkout,
  updateWorkout,
};
