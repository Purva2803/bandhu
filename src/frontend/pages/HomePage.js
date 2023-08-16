import { CreatePost } from "../createPost";
import { GetPosts } from "../getPosts";
import { useState } from "react";
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Sorting } from "../sorting";

export const HomePage = () => {
  return (
    <div>
      <header className="App-header">
        <h1>Bandhu</h1>
      </header>
       <Sidebar />
     
      <div className="main-content">
        <main >
          <CreatePost />

         
        </main>
      </div>
      
     
    </div>
  );
};
