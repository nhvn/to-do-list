import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Home() {
  const [login, setLogin] = useState(false);
  const [create, setCreate] = useState(false);

  if (login) {
    return <Navigate to="/login" />;
  } else if (create) {
    return <Navigate to="/register" />;
  }

  return (
    <div className='home'>

      <div className='content'>
        <h1>Master Your Tasks, Master Your Day</h1>

      <div className='hero-image'>
        <img src='/homeCover.jpg' alt='checklist' />
      </div>

        <div className="mission">
          <h2>What is our mission?</h2>
          <p>
          We designed this platform to help you stay organized and focused, whether you're tackling daily tasks, planning for the future, or jotting down quick notes. With Task Master, you can easily track your progress and ensure that nothing slips through the cracks. Our goal is to provide a fun and intuitive way for you to manage everything on your plate, from your daily "Today" tasks to your long-term "Objectives." Whether it's a simple to-do or a critical agenda item, we’ve got you covered.
          </p>
          <p>
          Our unique "Bulletin Board" feature also allows you to quickly place and review random notes or ideas, so you can keep everything you need in one convenient place. No more forgetting or losing track of what you have to do each day—Task Master saves and organizes your tasks, showing you what's completed and what's still pending.
          </p>
        </div>

        <div className='start'>
          <h2>How do you get started?</h2>
          <p>Super simple! Just click on "Register" to create an account, and you can begin organizing your life. Start by adding tasks to your "Today," "Agenda," and "Objectives" boxes. You can also utilize the "Bulletin Board" for quick notes and reminders. Task Master is designed to make your life easier, one task at a time.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;