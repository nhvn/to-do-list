import { useState } from 'react';
import { Navigate } from 'react-router';

function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const[submitLogin, setSubmitLogin] = useState(false);
    if (submitLogin){
        return <Navigate to="/profile" />;

    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const login = { username, password};
      console.log({login})
  }
  return (
    <div className='login'>
        <h1>Sign In</h1>
        <form  onSubmit={handleSubmit} className='loginform'>
            <label>Username</label>
            <input
            type='text'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
            </input>
            <label>Password</label>
            <input
        type="text"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        >
        </input>

<button id="submitLogin" 
onClick={()=>{
 setSubmitLogin(true);
 }}>
     Login</button>
    </form>
</div>
  )
}

export default Login