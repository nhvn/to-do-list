import React from 'react'

function Profile() {
  return (
    <div className='profilepage'>
        <h1>Hello, friend!</h1>
        <div className='userTasks'>
            <h2>All Tasks:</h2>
            <br></br>
            <h2 id ="complete">Completed Tasks:</h2>
            <br></br>
            <h2 id = "unfinish">Unfinished Tasks:</h2>
            <br></br>
        </div>
    </div>
  )
}

export default Profile