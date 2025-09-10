// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import RegistrationForm from './components/registrationForm';
import LoginPage from './pages/LoginPage';
import About from './pages/about';
import Contact from './pages/contact';
import Profile from './components/Profile';
import Attendance from './pages/attendace';

import StudentHome from './student/StudentHome';
import EmployeeHome from './employee/EmployeeHome';
import HRHome from './hr/HRhome';
import ManagerHome from './manager/ManagerHome';
import Careers from './pages/careers';
import Services from './pages/services';
import LeaveCalendar from './employee/leave';


import Nav from './components/nav';
import LoginNav from './components/LoginNav';
import Notifications from './components/Notifications';
import { useAuth } from './context/AuthContext';
import Footer from './pages/footer';

//Hrpage
import UserManagement from './hr/UserManagement';
import HRAttendanceMgt from './hr/HRattendancemgt';
import HRContactUsView from './hr/HRcontactusview';

function App() {
  const { user, loading } = useAuth();
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // ✅ Sync user ID
  useEffect(() => {
    setLoggedInUserId(user?.id || null);
  }, [user]);

  // ✅ Show loading if still checking auth state
  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <Router>
      {/* ✅ Nav logic based on login */}
      {user ? <LoginNav /> : <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/attendance" element={<Attendance />} />


        {loggedInUserId && (
          <Route path="/leave" element={<LeaveCalendar userId={loggedInUserId} />} />
        )}

        {/* Role-specific dashboards */}
        <Route path="/student/StudentHome" element={<StudentHome />} />
        <Route path="/employee/EmployeeHome" element={<EmployeeHome />} />
        <Route path="/hr/HRHome" element={<HRHome />} />
        <Route path="/manager/ManagerHome" element={<ManagerHome />} />


        {/*Hr routes */}
       <Route path="/hr/UserManagement" element={<UserManagement />} />
       <Route path="/hr/AttendanceManagement" element={<HRAttendanceMgt />} />
       <Route path="/hr/ContactUsMessages" element={<HRContactUsView />} />
      </Routes>
      <Footer /> {/* ⬅️ Always at the bottom */}
    </Router>
    
  );
  
}

export default App;
