require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

const app = express();

// Use cors middleware to allow cross-origin requests
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Use body-parser middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Use express-session middleware for session management
app.use(
  session({
    secret: '54321', // Custom secret string
    resave: false,
    saveUninitialized: true,
  })
);

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API!');
});

// User registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while registering a new user' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.user = { user_id: user.user_id, email: user.email };
      res.status(200).json({ user_id: user.user_id, email: user.email });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

// Require authentication for all routes below this middleware
app.use((req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  next();
});

// Get all tasks for a user
app.get('/tasks', async (req, res) => {
  const userId = req.session.user.user_id;

  try {
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    res.json(tasks.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new task for a user
app.post('/create', async (req, res) => {
  const user_id = req.session.user.user_id;

  try {
    const { title, description, due_date, priority, completed } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, due_date, priority, completed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, title, description, due_date, priority, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while creating a new task' });
  }
});

// Update a task for a user
app.put('/tasks/:task_id', async (req, res) => {
  const user_id = req.session.user.user_id;
  const { task_id } = req.params;
  const { title, description, due_date, priority, completed } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, priority = $4, completed = $5 WHERE task_id = $6 AND user_id = $7 RETURNING *',
      [title, description, due_date, priority, completed, task_id, user_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the task' });
  }
});

// Mark a task as complete for a user
app.put('/tasks/:task_id/complete', async (req, res) => {
  const user_id = req.session.user.user_id;
  const { task_id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE tasks SET completed = true WHERE task_id = $1 AND user_id = $2 RETURNING *',
      [task_id, user_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while marking the task as complete' });
  }
});

// Mark a task as incomplete for a user
app.put('/tasks/:task_id/incomplete', async (req, res) => {
  try {
    const user_id = req.session.user.user_id;
    const { task_id } = req.params;

    const result = await pool.query(
      'UPDATE tasks SET completed = false WHERE task_id = $1 AND user_id = $2 RETURNING *',
      [task_id, user_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while marking the task as incomplete' });
  }
});
  
  // Delete a task for a user
  app.delete('/tasks/:task_id', async (req, res) => {
    const user_id = req.session.user.user_id;
    const { task_id } = req.params;
  
    try {
      await pool.query('DELETE FROM tasks WHERE task_id = $1 AND user_id = $2', [
        task_id,
        user_id,
      ]);
      res.status(204).json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'An error occurred while deleting the task' });
    }
  });
  
  // Start server
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
