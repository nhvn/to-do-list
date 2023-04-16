import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        email,
        password: pass,
      });
      console.log('New user registered:', response.data);
      // Refresh the current page to show the user is logged in
      navigate('.', { replace: true });
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred while registering a new user');
    }
  };

  return (
    <div className='register'>
      <h1>Create an Account!</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type='password'
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button id='createacc'>Create Account</button>
        {error && <p className='error-message'>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
