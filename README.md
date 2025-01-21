# Workout Tracker

This is a **Workout Tracker** application built using **Node.js**, **Express**, **MongoDB**, and **JWT** for authentication. It allows users to log their workouts, view a list of all workouts, manage individual workouts, and track workout performance by reps or load. Users can also access a leaderboard based on their total reps or load.

---

## Features

- **User Authentication**:
  - Secure login and authentication using **JWT** (JSON Web Tokens).
  - Password encryption with **bcrypt**.
  - Protected routes for managing workouts.

- **Workout Management**:
  - Users can create, view, update, and delete their workouts.
  - Workouts include details such as **title**, **reps**, **load**, and an optional **image**.
  - All workout data is stored in a **MongoDB** database.

- **Workout Rankings**:
  - View rankings of users based on their total **reps** or **load**.

- **Admin Dashboard**:
  - Users can access a dashboard to manage their workouts.
  - Only authenticated users with a valid JWT token can access the dashboard.

---

## Technologies Used

- **Node.js**: JavaScript runtime used for building the server-side logic.
- **Express.js**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database to store workout and user information.
- **JWT**: JSON Web Tokens used for secure user authentication.
- **bcrypt**: Password hashing library for securing user passwords.
- **Mongoose**: MongoDB object modeling tool for managing the database.
- **Cookie Parser**: Middleware for handling cookies used to store JWT tokens.

---

## MongoDB Database Structure

The **MongoDB** database used by this application consists of two collections:

- **Users Collection**:
  - Stores user information such as email, password (hashed using bcrypt), and other relevant details.
  - Each user document contains a unique `_id` used to identify the user.

- **Workouts Collection**:
  - Stores workout data such as **title**, **reps**, **load**, and an optional **image**.
  - Each workout document contains a `userId` field, which is a reference to the user who created that workout. This allows workouts to be associated with a specific user.
  - The `userId` field is a **foreign key** to the `_id` of the user from the **Users** collection.

The relationship between the **Users** and **Workouts** collections is as follows:

- Each workout belongs to a specific user, identified by the `userId` field.
- This allows the application to query and display all workouts associated with a specific user.

---

## Routes

### **Authentication Routes**
- **POST** `/api/users/login`: Login the user and return a JWT token.
- **GET** `/api/users/logout`: Logout the user and clear the JWT token.

### **Workout Routes**
- **GET** `/api/workouts`: Get all workouts (supports sorting by **createdAt**, **reps**, or **load**).
- **GET** `/api/workouts/:id`: Get a single workout by its ID.
- **GET** `/api/workouts/user/:userId`: Get all workouts for a specific user.
- **POST** `/api/workouts`: Create a new workout (requires authentication).

### **Ranking Routes**
- **GET** `/api/workouts/rankings/reps`: Get a leaderboard of users based on total reps.
- **GET** `/api/workouts/rankings/load`: Get a leaderboard of users based on total load lifted.

## Deployment
This application is deployed backend on [Railway](https://railway.com/) and frontend on [Netlify](https://www.netlify.com/)
