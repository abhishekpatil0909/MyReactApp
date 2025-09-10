// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './registration.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ import context

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth(); // ✅ use login from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/login', formData);
      const user = res.data.user;

      login(user); // ✅ update context + localStorage
      setMessage(res.data.message);
      localStorage.setItem('userId', user.id); // Store user ID in localStorage
      localStorage.setItem('userRole', user.role); // Store user role in localStorage
      localStorage.setItem('userName', user.name); // Store user name in localStorage
      localStorage.setItem('userEmail', user.email); // Store user email in localStorage

      // Redirect based on role
      switch (user.role.toLowerCase()) {
        case 'student':
          navigate('/student/StudentHome');
          break;
        case 'employee':
          navigate('/employee/EmployeeHome');
          break;
        case 'hr':
          navigate('/hr/HRHome'); // ✅ fix typo: HRHome not HRome
          break;
        case 'manager':
          navigate('/manager/ManagerHome');
          break;
        default:
          setMessage('Role not recognized');
      }
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Check your email, password, and role.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Your Password"
        value={formData.password}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <button type="submit" className={styles.button}>Login</button>

      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default LoginForm;
