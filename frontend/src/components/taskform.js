// NO JWT

import { useState } from 'react';
import axios from 'axios';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [completed, setCompleted] = useState(false);
  const [type, setType] = useState('Work'); // Add this line
  const [taskCreated, setTaskCreated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/create',
        {
          title,
          description,
          due_date: dueDate,
          priority,
          completed,
        }
      );
      console.log('Task created:', response.data);
      setTaskCreated(true);
    } catch (error) {
      console.error('Error creating task:', error);
      setError('An error occurred while creating the task');
    }
  };  

  return (
    <div className='task-form'>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <input
          type='text'
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Due Date</label>
        <input
          type='date'
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label>Priority</label>
        <input
          type='number'
          required
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <label>Task Type</label>
        <select
            value={type}
            onChange={(e) => setType(e.target.value)}
        >
            <option value="Work">Work</option>
            <option value="Chores">Chores</option>
            <option value="Urgent">Urgent</option>
            <option value="Personal">Goals</option>
        </select>
        <button id="button">Add Task</button>
        {/* <label>Completed</label>
        <input
          type='checkbox'
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <button id='submitTask'>Create Task</button> */}
      </form>
      {error && <p className="error">{error}</p>}
      {taskCreated && <p className="success">Task created successfully!</p>}
    </div>
  );
}

export default TaskForm;
