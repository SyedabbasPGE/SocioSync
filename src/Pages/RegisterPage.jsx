
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import custom styles

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = () => {
    axios
      .post("https://server-u7jn.onrender.com/signup", { email, password })
      .then((response) => {
        console.log(response.data);
        navigate("/login"); // After successful registration, navigate to login
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed");
      });
  };

  return (
    <div className="login-register-page relative flex justify-center items-center h-screen w-full">
      {/* Video Background */}
      <video className="background-video absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src="/backgroundvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for dimming the background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md p-6 bg-black bg-opacity-60 rounded-lg shadow-lg">
        <div className="text-center">
          {/* Profile Icon */}
          <div className="profile-icon text-white text-5xl mb-4">
            <i className="bi bi-person-circle"></i>
          </div>
          <h2 className="text-white text-3xl mb-4">Register</h2>

          {/* Email Input */}
          <div className="input-group mb-4">
            <input
              type="email"
              id="email"
              className="form-control w-full p-4 text-lg bg-gray-800 text-white rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="input-group mb-6">
            <input
              type="password"
              id="password"
              className="form-control w-full p-4 text-lg bg-gray-800 text-white rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={registerUser}
            className="btn-primary w-full p-4 bg-blue-600 text-white text-xl rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-white">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
