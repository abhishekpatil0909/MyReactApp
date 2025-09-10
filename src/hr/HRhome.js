import React from 'react';
import './HRhome.css';
import { useNavigate } from 'react-router-dom';


const metrics = [
  {
    title: "Employee Management",
    items: ["Total employees", "By department", "New hires", "Contract types"],
    route: "/hr/UserManagement"
  },
  {
    title: "Attendance Management",
    items: ["Employee Attendance", "Total Time", "Overall Attendance", "Candidate Pipeline"],
    route: "/hr/AttendanceManagement"
  },
  {
    title: "Employee Turnover",
    items: ["Attrition rate", "Exit types", "Retention rate", "Exit reasons"],
    route: "/turnover"
  },
  {
    title: "Attendance & Leave",
    items: ["Absenteeism", "Late arrivals", "Leave balances", "Active vs inactive"],
    route: "/attendance"
  },
   {
    title: "Employee Engagement & Satisfaction",
    items: ["Employee surveys", "Feedback mechanisms", "Engagement programs", "Satisfaction scores"],
    route: "/engagement"
  },
   {
    title: "Performance Management",
    items: ["Goal setting", "Performance reviews", "Feedback culture", "Training & development"],
    route: "/performance"
  },
   {
    title: "Contact Data",
    items: ["Diversity metrics", "Inclusion programs", "Employee resource groups", "Bias training"],
    route: "/hr/ContactUsMessages"
  },
   {
    title: "Learning & Development",
    items: ["Training programs", "Skill assessments", "Career development", "Succession planning"],
    route: "/learning"
  },
  {
    title: "Payroll & Compensation",
    items: ["Salary structure", "Bonuses & incentives", "Payroll processing", "Compensation analysis"],
    route: "/payroll"
  },
  // Add more cards as needed
];

  

const HRHome = () => {
  const navigate = useNavigate(); // ✅ Add this

  return (
    <div className="hr-home-wrapper">
      <div className="overlay">
        <h1 className="heading">Welcome, HR 👩‍💼</h1>
        <p className="subtext">Manage employees, view reports, and handle recruitment efficiently.</p>
      </div>

      <div className="dashboard-container">
        <div className="cards-grid">
          {metrics.map((metric, index) => (
            <div className="dashboard-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <h2>{metric.title}</h2>
              <ul className="card-items">
                {metric.items.map((item, i) => (
                  <li key={i}>✅ {item}</li>
                ))}
              </ul>
              <button
                className="card-button"
                onClick={() => navigate(metric.route)} // ✅ Use navigate instead of alert
              >
                Go to Page
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default HRHome;
