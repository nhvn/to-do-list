
// app.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'An error occurred while registering a new user' });
//   }
// });

import React from 'react'

function Register() {
  return (
    <div>
      <form>
        <label>First Name</label>
        <input>
        
        </input>

        <label>Last Name</label>
        <input>
        
        </input>

        <label>Email</label>
        <input>
        
        </input>

        <label>Username</label>
          <input>
          
          </input>

          <label>Password</label>
          <input>
          
          </input> 
          <button id="register">Create Account!</button>
      </form>
    </div>
  )
}

export default Register