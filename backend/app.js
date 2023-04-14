// Import required modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API!");
});

// Setup PostgreSQL connection
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ROUTES

// User registration
app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while registering a new user" });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// Get all tasks for a user
app.get("/tasks", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.user_id;
    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      userId,
    ]);    
    res.json(tasks.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new task for a user
app.post("/create", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { title, description, due_date, priority, completed } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, description, due_date, priority, completed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, title, description, due_date, priority, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating a new task" });
  }
});

// Update a task for a user
app.put("/tasks/:task_id", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { task_id } = req.params;
    const { title, description, due_date, priority, completed } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, due_date = $3, priority = $4, completed = $5 WHERE task_id = $6 AND user_id = $7 RETURNING *",
      [title, description, due_date, priority, completed, task_id, user_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task" });
  }
});

// Delete a task for a user
app.delete("/tasks/:task_id", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { task_id } = req.params;
    await pool.query("DELETE FROM tasks WHERE task_id = $1 AND user_id = $2", [
      task_id,
      user_id,
    ]);
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task" });
  }
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});