import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { NavLink } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  let [user,setUser] = useState("");
  const {login} = useAuth();

  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();

    user = {  
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      username: username
    }
    setUser(user);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          username,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.encodedToken);
       localStorage.setItem('user',JSON.stringify(user));


        const { from } = location.state || { from: { pathname: "/home" } };
        window.location.pathname = from.pathname;
        alert("Signup successful");

      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>Sign Up here to connect with awesome people !</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSignup}>
        <label style={{ fontfamily: 'Montserrat',fontWeight: 'bold', margin: '0.5rem 0' }}>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ fontfamily: 'Montserrat',padding: '0.5rem', margin: '0.5rem 0', width: '300px', border: '1px solid #ccc', borderRadius: '10px' } } />
  
        <label style={{ fontfamily: 'Montserrat',fontWeight: 'bold', margin: '0.5rem 0' }}>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: '0.5rem', margin: '0.5rem 0', width: '300px', border: '1px solid #ccc', borderRadius: '10px' }}
        />
  
        <label style={{fontfamily: 'Montserrat',fontfamily: 'Montserrat', fontWeight: 'bold', margin: '0.5rem 0' }}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{fontfamily: 'Montserrat', padding: '0.5rem', margin: '0.5rem 0', width: '300px', border: '1px solid #ccc', borderRadius: '10px' }}
        />
  
        <label style={{ fontfamily: 'Montserrat',fontfamily: 'Montserrat',fontWeight: 'bold', margin: '0.5rem 0' }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{fontfamily: 'Montserrat', padding: '0.5rem', margin: '0.5rem 0', width: '300px', border: '1px solid #ccc', borderRadius: '10px' }}
        />
  
        <label style={{fontfamily: 'Montserrat',fontfamily: 'Montserrat', fontWeight: 'bold', margin: '0.5rem 0' }}>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ fontfamily: 'Montserrat',fontfamily: 'Montserrat',padding: '0.5rem', margin: '0.5rem 0', width: '300px', border: '1px solid #ccc', borderRadius: '10px' }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{ fontfamily: 'Montserrat',padding: '0.5rem 1rem', marginTop: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
  
        <label style={{ fontfamily: 'Montserrat',fontWeight: 'bold', margin: '0.5rem 0' }}>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ fontfamily: 'Montserrat',padding: '0.5rem', margin: '0.5rem 0', width: '300px', border: '1px solid #ccc', borderRadius: '10px' }}
        />
  
        <button
          type="submit"
          style={{fontfamily: 'Montserrat', fontfamily: 'Montserrat',padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sign Up
        </button>
        <p style={{ fontfamily: 'Montserrat',marginTop: '1rem' }}>
          Already have an account? <NavLink to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Log in</NavLink>
        </p>
      </form>
    </div>
  );
  
};

