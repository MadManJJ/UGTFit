require("dotenv").config();

// middleware = code between getting req and sending res

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");

// express app
const app = express();

// do when every req is come in
// middleware (.use)
app.use(cookieParser());
app.use(express.json()); // give access to req.body
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI) // async ( return promise )
  .then(() => {
    // after connect
    // listen for req
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`connected to db and Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
