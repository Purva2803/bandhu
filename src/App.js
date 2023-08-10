import "./App.css";
import { HomePage } from "../src/frontend/pages/HomePage";
import logo from "./logo.png";
import { NavLink, Routes, Route } from "react-router-dom"
import { Login } from "../src/frontend/pages/Login";
import { useState } from "react";
import { Signup } from "../src/frontend/pages/Signup";
import Mockman from "mockman-js"
import { Explore } from "./frontend/pages/Explore";
import { Logout } from "./frontend/pages/Logout";
import '../src/frontend/styles/sidebar.css'
import { Sidebar } from "./frontend/components/sidebar";

function App() {
  return (
    <div >
      <nav>
       <Sidebar/>
      
      

      </nav>
      <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/explore" element={<Explore/>}
      />
      <Route path="/logout" element={<Logout/>}/>
      </Routes>

      
    </div>


     );
}

export default App;
