import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser] = useState("");
  
  const {login} = useAuth();
  const Navigate = useNavigate();
  

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }


  };

  const handleGuestLogin = () => {
    setUsername('purva');
    setPassword('purva2803');

    user = {
      username: 'purva',
      password: 'purva2803'
    }
    setUser(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();



      if (response.ok) {
        login(data);
        console.log(data);
       
        window.alert("Login successful");
        localStorage.setItem("token", data.encodedToken);
        Navigate("/home");
       
      } else {
       
        window.alert(data.errors[0]);
        
       
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <h1>Welcome to Bandhu💜!</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="username" style={{ fontWeight: 'bold', marginTop: '1rem' }}>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your username.."
          value={username}
          onChange={handleChange}
          style={{fontfamily: 'Montserrat', padding: '0.5rem', marginTop: '0.5rem', width: '300px' }}
        />
        <label htmlFor="password" style={{ fontWeight: 'bold', marginTop: '1rem' }}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password.."
          value={password}
          onChange={handleChange}
          style={{fontfamily: 'Montserrat', padding: '0.5rem', marginTop: '0.5rem', width: '300px' }}
        />
        <button
          type="button"
          onClick={handleGuestLogin}
          style={{ fontfamily: 'Montserrat',padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#123456                                                                                                                                      ', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Log in as a Guest
        </button>
        <button
          type="submit"
          style={{ fontfamily: 'Montserrat',padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#737000 ', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Submit
        </button>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account? <NavLink to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up</NavLink>
        </p>
      </form>
    </div>
  );
};

