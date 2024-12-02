import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import { toast} from "react-toastify";

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
      console.log(formData);
      const response = await axios.post('https://bulk-order-platform-1.onrender.com/login/signup', formData);
      setMessage(response.data.message);
      toast.success("User registered successfully!")
      if (response.data.message === 'User registered successfully!') {
        if (formData.role === 'admin') {
          navigate('/inventory'); // Redirect to admin dashboard
        } else {
          navigate('/'); // Redirect to user dashboard
        }
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error signing up');
      toast.error('Error signing up')
    }
  };

  return (
    <>
    <div style={{ 
  background: "#4caf50", 
  color: 'white', 
  padding: '3px', 
  borderRadius: '2px', 
  display: "flex", 
  justifyContent: 'space-between',  // Space between the elements (icon and title)
  alignItems: 'center',             // Center elements vertically
  width: '100%'  ,                   // Ensure it takes up the full width
  height:"60px"
}}>
  <FaHome style={{marginLeft:"30px",fontSize: '30px', cursor: 'pointer'}} onClick={() => navigate("/")} />
  <h1 style={{ margin: '0', textAlign: 'center', flexGrow: 1 }}>Bulk Ordering Platform</h1>
</div>
    <div style={styles.container}>
      <h2 style={styles.header}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    padding: '20px',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  message: {
    marginTop: '20px',
    color: 'green',
    fontWeight: 'bold',
  },
};

export default SignUp;
