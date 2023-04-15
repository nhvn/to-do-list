import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Taskform from "./components/taskform";
import Register from "./components/register";
import Profile from "./components/profile";
import Login from "./components/loginform";
import { AuthProvider } from "./authContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} userName={userName} setUserName={setUserName} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
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
