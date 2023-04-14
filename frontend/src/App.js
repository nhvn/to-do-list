import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Taskform from "./components/taskform";
import Register from "./components/register";
import Profile from "./components/profile";
import Login from "./components/loginform";
import { AuthProvider } from "./authContext";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/tasks");
        const data = await response.json();
        setTasks(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("An error occurred while fetching tasks.");
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <Home tasks={tasks} isLoading={isLoading} error={error} />
                }
              />
              <Route path="/create" element={<Taskform />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
