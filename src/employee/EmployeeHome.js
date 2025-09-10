import React, { useEffect, useState } from "react";
import "./EmployeeHome.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation

const EmployeeHome = () => {
  const [employeeName, setEmployeeName] = useState("Employee");
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      axios.get(`http://localhost:5001/api/employee/${id}`)
        .then((res) => setEmployeeName(res.data.name))
        .catch((err) => console.error(err));
    }
  }, []);

  const today = new Date().toLocaleDateString();

  return (
    <div className="employee-home">
      <div className="greeting welcome-card">
        <h1>👋 Welcome, {employeeName}</h1>
        <p>Today is {today}</p>
      </div>

      <div className="card-grid">
        <div className="card profile">
          <h3>👤 Profile</h3>
          <p><strong>Role:</strong> Software Engineer</p>
          <p><strong>Dept:</strong> IT</p>
          <p><strong>Joined:</strong> Jan 2022</p>
        </div>

        <div className="card leave">
          <h3>🛫 Leave Summary</h3>
          <p>Remaining: 8</p>
          <p>Used: 4</p>
          <button onClick={() => navigate("/leave")}>Apply Leave</button>
        </div>

        <div className="card attendance">
          <h3>⏱ Attendance</h3>
          <p>Today: 7.5 hrs</p>
          <button onClick={() => navigate("/attendance")}>View Attendance</button>
        </div>

        <div className="card tasks">
          <h3>✅ Tasks</h3>
          <ul>
            <li>Finish login page</li>
            <li>Update calendar</li>
            <li>Code review @3PM</li>
          </ul>
        </div>

        <div className="card calendar">
          <h3>📅 Calendar</h3>
          <p>Upcoming leave: Aug 3</p>
        </div>

        <div className="card announcements">
          <h3>📢 Announcements</h3>
          <p>Company Townhall on Friday</p>
        </div>

        <div className="card notifications">
          <h3>🔔 Notifications</h3>
          <p>1 Leave Approved</p>
        </div>

        <div className="card performance">
          <h3>📊 Performance</h3>
          <p>Last Review: ⭐⭐⭐⭐☆</p>
        </div>

        <div className="card links">
          <h3>🔗 Quick Links</h3>
          <ul>
            <li>Update Profile</li>
            <li>Download Payslip</li>
            <li>Contact HR</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
