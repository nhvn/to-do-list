import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/tasks", {
          withCredentials: true
        });
        const data = response.data;
        setTasks(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(<div className="error">An error occurred while fetching tasks.</div>);
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const saveTask = async (task) => {
    // Save the updated task here by making a PUT request to your API
    // Example: await axios.put(`http://localhost:8000/tasks/${task.task_id}`, updatedTask, { withCredentials: true });

    const updatedTasks = tasks.map(t => (t.task_id === task.task_id ? { ...t, ...updatedTask } : t));
    setTasks(updatedTasks);
    setEditingTask(null);
    setUpdatedTask({});
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setUpdatedTask({});
  };

  const renderTask = (task) => {
    if (editingTask === task.task_id) {
      return (
        <li key={task.task_id}>
          <label>
            Title:
            <input name="title" defaultValue={task.title} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Description:
            <input name="description" defaultValue={task.description} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Due Date:
            <input name="due_date" defaultValue={task.due_date} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Priority:
            <input name="priority" defaultValue={task.priority} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Completed:
            <input name="completed" type="checkbox" defaultChecked={task.completed} onChange={(e) => handleInputChange({ target: { name: 'completed', value: e.target.checked } })} />
          </label>
          <br />
          <label>
            Type:
            <input name="type" defaultValue={task.type} onChange={handleInputChange} />
          </label>
          <br />
          <button onClick={() => saveTask(task)}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
          <br />
          <br />
        </li>
      );
    }

    return (
      <li key={task.task_id}>
        <span>{task.title}</span>
        <button className="editButton" onClick={() => setEditingTask(task.task_id)}>Edit</button>
      </li>
    );
  };

  return (
    <div className='profilepage'>
      <h1>Hello, friend!</h1>
      <div className='userTasks'>
        <h2>All Tasks:</h2>
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {tasks.map(renderTask)}
          </ul>
        )}
        <br></br>
        <h2 id="complete">Completed Tasks:</h2>
        <ul>
          {completedTasks.map(renderTask)}
        </ul>
        <br></br>
        <h2 id="unfinish">Unfinished Tasks:</h2>
        <ul>
          {incompleteTasks.map(renderTask)}
        </ul>
        <br></br>
      </div>
    </div>
  );
}

export default Profile;