import "./App.css";
import { HomePage } from "./frontend/HomePage";
import logo from "./logo.png";
import { NavLink, Routes, Route } from "react-router-dom"
import { Login } from "./frontend/Login";
import { useState } from "react";
import { Signup } from "./frontend/Signup";
import Mockman from "mockman-js"

function App() {
  return (
    <div className="App">
      <nav>
      <NavLink to="/">
      home
      </NavLink>
      ||
      <NavLink to="/login">
      login
      </NavLink>
      ||
      <NavLink to="/signup">
      signup
      </NavLink>
      

      </nav>
      <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>

      
    </div>


     );
}

export default App;
