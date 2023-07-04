import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

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
       
        window.alert("Login successful");
        localStorage.setItem("token", data.encodedToken);
        window.location.href = "/";
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="username" style={{ fontWeight: 'bold', marginTop: '1rem' }}>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your username.."
          value={username}
          onChange={handleChange}
          style={{ padding: '0.5rem', marginTop: '0.5rem', width: '300px' }}
        />
        <label htmlFor="password" style={{ fontWeight: 'bold', marginTop: '1rem' }}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password.."
          value={password}
          onChange={handleChange}
          style={{ padding: '0.5rem', marginTop: '0.5rem', width: '300px' }}
        />
        <button
          type="button"
          onClick={handleGuestLogin}
          style={{ padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Log in as a Guest
        </button>
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

