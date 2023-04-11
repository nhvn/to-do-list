import { useState } from "react";

const Taskform = () => {
        const [ title, setTitle ] = useState('');
        const [ body,setBody ] = useState('');
        const [type,setType] = useState('');

        const handleSubmit = (e) => {
                e.preventDefault();
                const task = { title, body, type};
                console.log({task})
        }
    return (
        <div classname="form">
            <h2 id="h2">Create a Task!</h2>
            <form  onSubmit={handleSubmit}>
                <label>Task Name</label>
                <input 
                     type="text"
                     required
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                />
                <label>Task Description</label>
                <textarea
                     required
                     value = {body}
                     onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
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
            </form>
        </div>
    )
}
export default Taskform;