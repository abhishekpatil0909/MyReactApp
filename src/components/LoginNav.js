import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginNav = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'student': return '/student/StudentHome';
      case 'employee': return '/employee/EmployeeHome';
      case 'hr': return '/hr/HRHome';
      case 'manager': return '/manager/ManagerHome';
      default: return '/';
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setUser(null);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to={getDashboardPath()} style={styles.logoLink}>
          Track<span style={styles.logoAccent}>HQ</span>
        </Link>
      </div>

      <div style={styles.links}>
        <AnimatedLink to={getDashboardPath()} label="Dashboard" />
        <AnimatedLink to="/profile" label="Profile" />
        <AnimatedLink to="/Notifications" label="Notifications" />
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const AnimatedLink = ({ to, label }) => (
  <Link to={to} style={styles.animatedLink} className="animated-link">
    {label}
    <span className="underline"></span>
  </Link>
);

// CSS-in-JS styles
const styles = {
  nav: {
    background: 'linear-gradient(90deg, #000000, #0f0f0f)',
    color: '#fff',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
  logoLink: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  logoAccent: {
    color: '#00ffff',
    textShadow: '0 0 5px #0ff',
  },
  links: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
  animatedLink: {
    position: 'relative',
    color: '#00ffff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    padding: '4px 0',
    transition: 'color 0.3s ease',
  },
  logoutBtn: {
    backgroundColor: '#ff0040',
    color: '#fff',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 0 10px #ff0040',
    transition: 'all 0.3s ease',
  },
};

// Add custom animations via style tag
const styleSheet = `
  .animated-link {
    position: relative;
    overflow: hidden;
  }

  .animated-link .underline {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 2px;
    background: #00ffff;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .animated-link:hover {
    color: #00ffff;
  }

  .animated-link:hover .underline {
    transform: scaleX(1);
  }

  button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px #ff0040;
  }
`;

// Inject styles only once
if (!document.getElementById('login-nav-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'login-nav-styles';
  styleEl.innerHTML = styleSheet;
  document.head.appendChild(styleEl);
}

export default LoginNav;
