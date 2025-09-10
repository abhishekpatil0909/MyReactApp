import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/bg.jpeg';

const navWrapperBaseStyle = {
  width: '100%',
  backgroundColor: '#000',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  position: 'relative',
};

const navStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  width: '100%',
  position: 'relative',
};

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
};

const linkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  margin: '0 20px',
  fontWeight: '600',
  fontSize: '20px',
  transition: 'all 0.3s ease',
  position: 'relative',
};

const navLinkHoverStyle = {
  color: '#00e6e6',
  textShadow: '0 0 8px #00ffff',
  transform: 'scale(1.1)',
};

const backButtonStyle = {
  background: 'transparent',
  color: '#ffffff',
  border: '1px solid white',
  borderRadius: '8px',
  padding: '6px 12px',
  fontSize: '14px',
  cursor: 'pointer',
  marginRight: '20px',
};

export default function Nav() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, navLinkHoverStyle);
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = '#ffffff';
    e.target.style.textShadow = '';
    e.target.style.transform = '';
  };

  const routes = ['/', '/about', '/contact', '/services', '/careers'];

  const getLabel = (path) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/about':
        return 'About Us';
      case '/contact':
        return 'Contact Us';
      case '/services':
        return 'Services';
      case '/careers':
        return 'Careers';
      default:
        return '';
    }
  };

  return (
    <div
      style={{
        ...navWrapperBaseStyle,
        transform: animate ? 'translateY(0)' : 'translateY(-100%)',
        opacity: animate ? 1 : 0,
        transition: 'all 0.8s ease',
      }}
    >
      <nav style={navStyle}>
        <div style={overlayStyle}></div>

        {/* 🔹 Nav Content in 3 Columns: Left | Center | Right (empty) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            zIndex: 1,
          }}
        >
          {/* Left: Back Button */}
          <div style={{ flex: 1 }}>
            <button onClick={() => window.history.back()} style={backButtonStyle}>
              ⬅ Back
            </button>
          </div>

          {/* Center: Navigation Links */}
          <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
            {routes.map((path, index) => (
              <Link
                key={index}
                to={path}
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {getLabel(path)}
              </Link>
            ))}
          </div>

          {/* Right: Empty for layout symmetry */}
          <div style={{ flex: 1 }} />
        </div>
      </nav>
    </div>
  );
}
