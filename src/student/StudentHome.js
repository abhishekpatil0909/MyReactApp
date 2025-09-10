// StudentHome.js
import React from 'react';
import './StudentHome.css';

const StudentHome = () => {
  return (
    <div className="student-home">
      <div className="content">
        <h1 className="title">🎓 Welcome Student</h1>
        <p className="subtitle">View courses, manage assignments, and track your progress.</p>
        <button className="btn-view">Explore Courses</button>
      </div>
    </div>
  );
};

export default StudentHome;
