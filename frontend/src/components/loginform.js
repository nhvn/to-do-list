import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { handleLogin, setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      console.log("Access token:", response.data.accessToken);
      // Set the token in the AuthContext
      setToken(response.data.accessToken);
      // Call handleLogin instead of setLoggedIn
      handleLogin(response.data.accessToken);
      console.log(`Logged in successfully as ${email}`);
      setSubmitLogin(true);
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const [submitLogin, setSubmitLogin] = useState(false);
  if (submitLogin) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className='login'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className='loginform'>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button id='submitLogin'>Login</button>
      </form>
      {error && <p className='error'>{error}</p>}
      <p>Please log in to continue.</p>
    </div>
  );
}

export default Login;
