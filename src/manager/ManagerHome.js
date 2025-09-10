import React, { useState, useEffect } from 'react';
import {
  FaUsers, FaProjectDiagram, FaCheckCircle, FaDollarSign,
  FaBell, FaCalendarAlt, FaTasks, FaFileDownload, FaCog, FaChartPie
} from 'react-icons/fa';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import './ManagerHome.css';

const ManagerHome = ({ navigate }) => {
  const [metrics, setMetrics] = useState({
    employees: 0,
    projects: 0,
    approvals: 0,
    revenue: 0
  });

  useEffect(() => {
    const targets = { employees: 124, projects: 12, approvals: 8, revenue: 45000 };
    const interval = setInterval(() => {
      setMetrics(prev => {
        let updated = { ...prev };
        let allReached = true;
        for (let key in prev) {
          if (prev[key] < targets[key]) {
            updated[key] = Math.min(prev[key] + Math.ceil(targets[key] / 50), targets[key]);
            allReached = false;
          }
        }
        if (allReached) clearInterval(interval);
        return updated;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const performanceData = [
    { month: 'Jan', score: 70 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 90 },
    { month: 'May', score: 88 }
  ];

  const taskData = [
    { name: 'Project A', tasks: 12 },
    { name: 'Project B', tasks: 9 },
    { name: 'Project C', tasks: 15 },
    { name: 'Project D', tasks: 7 }
  ];

  const leaveData = [
    { name: 'Approved', value: 8 },
    { name: 'Pending', value: 3 },
    { name: 'Rejected', value: 2 }
  ];
  const leaveColors = ['#28a745', '#ffc107', '#dc3545'];

  return (
    <div className="manager-home">
      {/* Hero */}
      <div className="hero-section">
        <div className="overlay">
          <h1 className="heading animate-slide-down">Manager Dashboard 👨‍💼</h1>
          <p className="subtext">Monitor teams, assign projects, and generate reports efficiently.</p>
          <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
            TrackHQ
          </button>
        </div>
      </div>

      {/* Big Quick Actions */}
      <section className="quick-actions big-buttons">
        <button onClick={() => navigate('/add-task')}><FaTasks /> Add Task</button>
        <button onClick={() => navigate('/assign-employee')}><FaUsers /> Assign Employee</button>
        <button onClick={() => navigate('/announcements')}><FaBell /> Notifications</button>
        <button onClick={() => navigate('/reports')}><FaFileDownload /> View Reports</button>
      </section>

      {/* KPI Cards */}
      <section className="kpi-section">
        <div className="kpi-card"><FaUsers className="kpi-icon" /><h3>{metrics.employees}</h3><p>Total Employees</p></div>
        <div className="kpi-card"><FaProjectDiagram className="kpi-icon" /><h3>{metrics.projects}</h3><p>Active Projects</p></div>
        <div className="kpi-card"><FaCheckCircle className="kpi-icon" /><h3>{metrics.approvals}</h3><p>Pending Approvals</p></div>
        <div className="kpi-card"><FaDollarSign className="kpi-icon" /><h3>${metrics.revenue.toLocaleString()}</h3><p>Revenue</p></div>
      </section>

{/* Other Main Functionalities */}
      <section className="main-nav">
        <button onClick={() => navigate('/employees')}><FaUsers /> Employee Management</button>
        <button onClick={() => navigate('/projects')}><FaProjectDiagram /> Project Management</button>
        <button onClick={() => navigate('/approvals')}><FaCheckCircle /> Approvals & Leaves</button>
        <button onClick={() => navigate('/analytics')}><FaChartPie /> Analytics</button>
        <button onClick={() => navigate('/settings')}><FaCog /> Settings</button>
      </section>
      {/* Charts Row */}
      <section className="charts-row">
        <div className="card-section small-chart">
          <h2>📊 Team Performance</h2>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={performanceData}>
              <Line type="monotone" dataKey="score" stroke="#0072ff" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-section small-chart">
          <h2>📅 Task Tracker</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#0072ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-section small-chart">
          <h2><FaCalendarAlt /> Leave & Attendance</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={leaveData} dataKey="value" nameKey="name" outerRadius={60} label>
                {leaveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={leaveColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      
    </div>
  );
};

export default ManagerHome;
