import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await axios.post('https://bulk-order-platform.onrender.com/login/signup', formData);
      setMessage(response.data.message);
      if (response.data.message === 'User registered successfully!') {
        if (formData.role === 'admin') {
          navigate('/inventory');  // Redirect to admin dashboard
        } else {
          navigate('/');  // Redirect to user dashboard
        }
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Sign Up
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
