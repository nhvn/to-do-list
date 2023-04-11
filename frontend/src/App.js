import React, {useEffect,useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './components/home';
import Taskform from './components/taskform';
import Register from './components/register';



function App() {
  return (
  <Router>
    <div className='App'>
        <Navbar />
          <div className='content'>
            <Routes>

              <Route path="/" element={<Home />}></Route>
              <Route path="/create" element={<Taskform />}></Route>
              <Route path="/register" element={<Register />}></Route>

            </Routes>
          </div>
    </div>
    </Router>
  )
}

export default App
