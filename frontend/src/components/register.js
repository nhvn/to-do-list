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

import {useState} from 'react'

const Register = () => {

  const [ name, setName ] = useState('');
  const [ last, setLast ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ user, setUser ] = useState('');
  const [ pass, setPass ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const register = { name, last, email, pass};
    console.log({register})
}

  return (
    <div className='register'>
      <h1>Create an Account!</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        >
        </input>

        <label>Last Name</label>
        <input
           type="text"
           required
           value={last}
           onChange={(e) => setLast(e.target.value)}
        >
        </input>

        <label>Email</label>
        <input
           type="text"
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}
        >
        </input>

        <label>Username</label>
          <input
             type="text"
             required
             value={user}
             onChange={(e) => setUser(e.target.value)}
          >
          </input>

          <label>Password</label>
          <input
             type="text"
             required
             value={pass}
             onChange={(e) => setPass(e.target.value)}
          >
          </input> 

          <button id="createacc">Create Account</button>
      </form>
    </div>
  )
}

export default Register