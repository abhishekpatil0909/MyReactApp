// src/pages/Attendance.js
import React from 'react';
import axios from 'axios';

const Attendance = () => {
  const user = {
    userId: localStorage.getItem('userId'),
    userRole: localStorage.getItem('userRole'),
    userEmail: localStorage.getItem('userEmail'),
    userName: localStorage.getItem('userName'),
  };

  const punch = async (action) => {
    try {
      const res = await axios.post('http://localhost:5001/api/punch', {
        ...user,
        action,
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error punching');
    }
  };

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #141e30, #243b55)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle = {
    padding: '40px',
    borderRadius: '15px',
    backgroundColor: '#1e2a38',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '12px 25px',
    margin: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: '0.3s ease',
    fontWeight: 'bold',
  };

  const punchInStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const punchOutStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Welcome, {user.userName}</h2>
        <p style={{ marginBottom: '30px' }}>Mark your attendance below:</p>
        <div>
          <button
            style={punchInStyle}
            onMouseOver={(e) => (e.target.style.opacity = '0.85')}
            onMouseOut={(e) => (e.target.style.opacity = '1')}
            onClick={() => punch('Punch In')}
          >
            Punch In
          </button>
          <button
            style={punchOutStyle}
            onMouseOver={(e) => (e.target.style.opacity = '0.85')}
            onMouseOut={(e) => (e.target.style.opacity = '1')}
            onClick={() => punch('Punch Out')}
          >
            Punch Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
