import "./App.css";
import { HomePage } from "../src/frontend/pages/HomePage";
import logo from "./logo.png";
import { NavLink, Routes, Route } from "react-router-dom";
import { Login } from "../src/frontend/pages/Login";
import { useState } from "react";
import { Signup } from "../src/frontend/pages/Signup";
import Mockman from "mockman-js";
import { Explore } from "./frontend/pages/Explore";
import { Logout } from "./frontend/pages/Logout";
import "../src/frontend/styles/sidebar.css";
import { Sidebar } from "./frontend/components/sidebar";
import { Sorting } from "./frontend/sorting";
import { Profile } from "./frontend/pages/Profile";
import { useAuth } from "./frontend/context/authContext";
import ProtectedRoute from "./frontend/context/protectedRoutes";
import Thirdperson from "./frontend/pages/Thirdperson";
function App() {
  const { user, checkAuth } = useAuth();
  return (
    <div>
      <nav>
      
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
         

          <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
          <Route
            path="/explore"
            element={<ProtectedRoute element={Explore} />}
          />
          <Route path="/logout" element={<ProtectedRoute element={Logout} />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={Profile} />}

          />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/profile/:username" element={<Thirdperson />} />
        
      </Routes>
    </div>
  );
}

export default App;
