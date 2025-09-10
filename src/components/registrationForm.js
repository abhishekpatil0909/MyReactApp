import React, { useState } from 'react';
import axios from 'axios';
import styles from './registration.module.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5001/api/register', formData);
      setMessage(res.data.message || 'Registration successful!');
      setFormData({ name: '', email: '', password: '', role: '' });

    } catch (err) {
      setMessage('Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
     
     <select
  name="role"
  value={formData.role}
  onChange={handleChange}
  required
  className={styles.input}
>
  <option value="">Select Role</option>
  <option value="student">Student</option>
  <option value="employee">Employee</option>
  <option value="hr">HR</option>
  <option value="manager">Manager</option>
</select>


      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className={styles.input}
      />

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

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>

      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
