import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false); // add state for checking if user is logged in

  useEffect(() => {
    // check if user is logged in
    axios.get("http://localhost:8000/check_login")
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    // make a logout request to the server
    axios.post("http://localhost:8000/logout")
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(false);
          localStorage.clear(); // clear the email from local storage
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className='navbar'>
      <a href="/">
        <h1>Task Master</h1>
      </a>
      <div className='links'>
        <a href="/profile">Home</a>
        <br />
        <a href="/create">Create Task</a>
        <br />
        {loggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <br />
            <span>Logged in as {localStorage.getItem('email')}</span>
          </>
        ) : (
          <>
            <a href='/register'>Create Account</a>
            <br />
            <a href="/login">Login</a>
            <br />
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
