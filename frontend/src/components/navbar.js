import React, { useEffect } from 'react';
import axios from 'axios';

function Navbar({ loggedIn, setLoggedIn, userName, setUserName }) {
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/check_login', { withCredentials: true });
        if (response.status === 200) {
          setLoggedIn(true);
          setUserName(response.data.name);
          localStorage.setItem('name', response.data.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoginStatus();
  }, [setLoggedIn, setUserName]);

  const handleLogout = () => {
    axios
      .post('http://localhost:8000/logout', {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(false);
          setUserName('');
          localStorage.removeItem('name');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className='navbar'>
      <a href='/'>
        <h1>Task Master</h1>
      </a>
      <div className='nav-links'>
        {loggedIn && (
          <div className='links'>
            <a href='/profile'>My Tasks</a>
            <a href='/create'>Create Task</a>
          </div>
        )}
        {loggedIn ? (
          <div className='user-info'>
            <span>{userName}</span>
            <div className='logout-container'>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className='auth-links'>
            <a href='/register'>Register</a>
            <a href='/login'>Login</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
