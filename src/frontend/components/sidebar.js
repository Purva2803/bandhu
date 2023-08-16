import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export const Sidebar = () => {

    return (
    <div className="sidebar">
    <nav >
      
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    
     
    </nav>
    </div>
    );




}
