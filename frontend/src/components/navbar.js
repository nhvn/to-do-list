import React from 'react'

function Navbar() {

  return (
    <nav className='navbar'>
        <h1>Task Master</h1>
        <div className='links'>
                <a href="/">Home</a>
                <br></br>
                <a href="/create">Create Task</a>
                <br></br>
                <a href='/register'>Create Account</a>
                <br></br>
        </div>
    </nav>
  )
}

export default Navbar;
