const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true, // Each workout is tied to a user
    },
    imageUrl: {
      type: String, // Store the URL of the uploaded image from Cloudinary
      required: false, // Not required if no image is uploaded
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("workout", workoutSchema);
