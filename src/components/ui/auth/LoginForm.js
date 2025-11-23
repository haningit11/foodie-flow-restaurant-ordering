import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'; //  toast for messages

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  
  const from = location.state?.from?.pathname || "/";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      toast.success('Login successful! Redirecting...');
      
      // Redirect the user back to the original page they were trying to access
      navigate(from, { replace: true });

    } else {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-foodie-text mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodie-primary"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodie-primary"
          required
        />
       
      </div>
      <button 
        type="submit"
        className="w-full bg-foodie-primary hover:bg-foodie-red text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;