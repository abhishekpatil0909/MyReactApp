import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <span style={styles.logo}>TrackHQ ⚡</span>

    <p style={styles.copy}>
        © {new Date().getFullYear()} TrackHQ. All rights reserved.
      </p>

        {/* Social Icons */}
        <div style={styles.socialIcons}>
          <a href="https://instagram.com/procoder_islive" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              style={styles.icon}
            />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              style={styles.icon}
            />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              style={styles.icon}
            />
          </a>
        </div>
      </div>

      
    </footer>
  );
}

const styles = {
  footer: {
    background: '#000',
    color: '#fff',
    textAlign: 'center',
    padding: '20px 20px 10px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1100px',
    margin: '0 auto',
    paddingBottom: '10px',
  },
  logo: {
    fontSize: '1.3rem',
    color: '#00d9ff',
    fontWeight: 'bold',
    marginBottom: '10px',
    animation: 'glow 2s infinite alternate',
  },
  links: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  link: {
    textDecoration: 'none',
    transition: 'all 0.3s ease-in-out',
  },
  linkText: {
    color: '#ddd',
    position: 'relative',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  icon: {
    width: '28px',
    height: '28px',
    filter: 'brightness(0.8)',
    transition: 'transform 0.5s ease, filter 0.3s',
    animation: 'float 2s ease-in-out infinite',
  },
  copy: {
    fontSize: '0.8rem',
    color: '#888',
    marginTop: '15px',
  },
};

// 🔑 Inject Keyframe Animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes glow {
  from { text-shadow: 0 0 5px #00d9ff, 0 0 10px #00d9ff; }
  to { text-shadow: 0 0 15px #00d9ff, 0 0 25px #00d9ff; }
}
`, styleSheet.cssRules.length);

export default Footer;
