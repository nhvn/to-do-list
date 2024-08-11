import React, { useState } from "react";

function Profile() {
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, title: "Complete project proposal", description: "Finish the draft and send for review", dueDate: "2024-08-15", priority: "High" },
    { id: 2, title: "Call client at 2 PM", description: "Discuss project timeline", dueDate: "2024-08-11", priority: "Medium" },
    { id: 3, title: "Review team's progress", description: "Check in with each team member", dueDate: "2024-08-11", priority: "Low" },
  ]);

  const [agendaItems, setAgendaItems] = useState([
    { id: 1, title: "Weekly team meeting", description: "Go over project status", dueDate: "2024-08-12", priority: "Medium" },
    { id: 2, title: "Lunch with mentor", description: "Discuss career growth", dueDate: "2024-08-13", priority: "Low" },
    { id: 3, title: "Prepare presentation", description: "Create slides for client meeting", dueDate: "2024-08-14", priority: "High" },
  ]);

  const [objectives, setObjectives] = useState([
    { id: 1, title: "Increase productivity by 15%", description: "Implement new workflow", dueDate: "2024-09-30", priority: "High" },
    { id: 2, title: "Launch new product feature", description: "Finalize and release v2.0", dueDate: "2024-10-15", priority: "High" },
    { id: 3, title: "Improve customer satisfaction score", description: "Address top 3 customer complaints", dueDate: "2024-11-30", priority: "Medium" },
  ]);

  const [bulletinNotes, setBulletinNotes] = useState([
    { id: 1, content: "Team building event next Friday!", color: "#ffadad" },
    { id: 2, content: "Remember to submit expense reports", color: "#ffd6a5" },
    { id: 3, content: "New project kickoff meeting on Monday", color: "#fdffb6" },
    { id: 4, content: "Lunch and Learn: AI in Business, Thursday at 12", color: "#caffbf" },
    { id: 5, content: "Don't forget to water the office plants!", color: "#9bf6ff" },
    { id: 6, content: "Quarterly review presentations due next week", color: "#a0c4ff" },
    { id: 7, content: "Office closed for maintenance on Saturday", color: "#bdb2ff" },
    { id: 8, content: "Remember to update your timesheet", color: "#ffc6ff" },
    { id: 9, content: "Client feedback meeting at 3 PM", color: "#fffffc" },
    { id: 10, content: "New coffee machine in the break room!", color: "#ff9f9f" },
    { id: 11, content: "Sign up for the company picnic", color: "#d0f4de" },
    { id: 12, content: "IT system upgrade this weekend", color: "#e4c1f9" },
    { id: 13, content: "Reminder: Clean your desk before leaving", color: "#fcf6bd" },
    { id: 14, content: "New security protocols start next month", color: "#f0efeb" },
    // { id: 15, content: "Volunteer opportunity: local food bank", color: "#d8e2dc" },
  ]);

  const addItem = (section) => {
    const newItem = { id: Date.now(), title: "New item", description: "Description", dueDate: "2024-08-11", priority: "Medium" };
    switch(section) {
      case 'today':
        setTodayTasks([...todayTasks, newItem]);
        break;
      case 'agenda':
        setAgendaItems([...agendaItems, newItem]);
        break;
      case 'objectives':
        setObjectives([...objectives, newItem]);
        break;
      case 'bulletin':
        const newNote = { id: Date.now(), content: "New note", color: getRandomColor() };
        setBulletinNotes([...bulletinNotes, newNote]);
        break;
    }
  };

  const getRandomColor = () => {
    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderList = (items, section) => (
    <ul className="task-list">
      {items.map((item) => (
        <li key={item.id} className="task-item">
          <input type="checkbox" id={`task-${item.id}`} />
          <div className="task-content">
            <label htmlFor={`task-${item.id}`}>{item.title}</label>
            <p className="task-description">{item.description}</p>
            <div className="task-meta">
              <span className="due-date">Due: {item.dueDate}</span>
              <span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span>
            </div>
          </div>
        </li>
      ))}
      <li className="add-item">
        <button onClick={() => addItem(section)}>+</button>
      </li>
    </ul>
  );

  return (
    <div className="profile-page">
      <div className="task-containers">
        <div className="task-box">
          <h2>Today</h2>
          {renderList(todayTasks, 'today')}
        </div>
        <div className="task-box">
          <h2>Agenda</h2>
          {renderList(agendaItems, 'agenda')}
        </div>
        <div className="task-box">
          <h2>Objectives</h2>
          {renderList(objectives, 'objectives')}
        </div>
      </div>

      <div className="bulletin-board-container">
        <h2>Bulletin Board</h2>
        <div className="bulletin-board">
          {bulletinNotes.map((note) => (
            <div
              key={note.id}
              className="bulletin-note"
              style={{
                backgroundColor: note.color,
                transform: `rotate(${Math.random() * 10 - 5}deg)`,
              }}
            >
              {note.content}
            </div>
          ))}
          <div className="add-note">
            <button onClick={() => addItem('bulletin')}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Profile() {
//   const [tasks, setTasks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editingTask, setEditingTask] = useState(null);
//   const [updatedTask, setUpdatedTask] = useState({});

//   const completedTasks = tasks.filter((task) => task.completed);
//   const incompleteTasks = tasks.filter((task) => !task.completed);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8000/tasks", {
//           withCredentials: true,
//         });
//         const data = response.data;
//         setTasks(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setError(
//           <div className="error">An error occurred while fetching tasks.</div>
//         );
//         setIsLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdatedTask({ ...updatedTask, [name]: value });
//   };

//   const saveTask = async (task) => {
//     // Save the updated task here by making a PUT request to your API
//     // Example: await axios.put(`http://localhost:8000/tasks/${task.task_id}`, updatedTask, { withCredentials: true });

//     const updatedTasks = tasks.map((t) =>
//       t.task_id === task.task_id ? { ...t, ...updatedTask } : t
//     );
//     setTasks(updatedTasks);
//     setEditingTask(null);
//     setUpdatedTask({});
//   };

//   const cancelEdit = () => {
//     setEditingTask(null);
//     setUpdatedTask({});
//   };

//   const renderTask = (task) => {
//     if (editingTask === task.task_id) {
//       return (
//         <li key={task.task_id}>
//           <label>
//             Title:
//             <input
//               name="title"
//               defaultValue={task.title}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Description:
//             <input
//               name="description"
//               defaultValue={task.description}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Due Date:
//             <input
//               name="due_date"
//               defaultValue={task.due_date}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Priority:
//             <input
//               name="priority"
//               defaultValue={task.priority}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Completed:
//             <input
//               name="completed"
//               type="checkbox"
//               defaultChecked={task.completed}
//               onChange={(e) =>
//                 handleInputChange({
//                   target: { name: "completed", value: e.target.checked },
//                 })
//               }
//             />
//           </label>
//           <br />
//           <label>
//             Type:
//             <input
//               name="type"
//               defaultValue={task.type}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <button onClick={() => saveTask(task)}>Save</button>
//           <button onClick={cancelEdit}>Cancel</button>
//           <button>Delete</button>
//           <br />
//           <br />
//         </li>
//       );
//     }

//     return (
//       <li key={task.task_id}>
//         <span>{task.title}</span>
//         <button
//           className="editButton"
//           onClick={() => setEditingTask(task.task_id)}
//         >
//           Edit
//         </button>
//       </li>
//     );
//   };

//   return (
//     <div className="profilepage">
//       <h1>Hello, friend!</h1>
//       <div className="userTasks">
//         <h2>All Tasks:</h2>
//         {isLoading ? (
//           <p>Loading tasks...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <ul>{tasks.map(renderTask)}</ul>
//         )}
//         <br></br>
//         <h2 id="complete">Completed Tasks:</h2>
//         <ul>{completedTasks.map(renderTask)}</ul>
//         <br></br>
//         <h2 id="unfinish">Unfinished Tasks:</h2>
//         <ul>{incompleteTasks.map(renderTask)}</ul>
//         <br></br>
//       </div>
//     </div>
//   );
// }

// export default Profile;
