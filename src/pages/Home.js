import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInLeft {
        from { transform: translateX(-100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.content}>
        <h1 style={styles.title}>
          Welcome to <span style={styles.brand}>TrackHQ</span>
        </h1>
        <p style={styles.subtitle}>
          "Empowering companies to manage teams, tasks, and goals efficiently — all in one place."
        </p>
        <a href="/register" style={styles.ctaButton}>Create Your Free Account.........</a>
<p style={{ color: '#e5eaecff', marginTop: '10px' }}>
  Already registered?    
  <a href="/login" style={{ ...styles.ctaButton, marginLeft: '8px' }}>Log In Here</a>
</p>


      </div>

      <div style={styles.imageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Coding"
          style={styles.image}
        />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#0f172a',
    color: 'white',
    padding: '60px 40px',
    borderRadius: '16px',
    animation: 'fadeIn 1.5s ease-in',
    gap: '40px',
    margin: '30px auto',
    flexWrap: 'wrap',
    maxWidth: '1200px',
  },
  content: {
    flex: 1,
    animation: 'slideInLeft 1.5s ease-out',
    minWidth: '280px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  brand: {
    color: '#38bdf8',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    maxWidth: '500px',
    lineHeight: '1.6',
  },
  ctaButton: {
    padding: '14px 30px',
    backgroundColor: '#38bdf8',
    color: '#0f172a',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.4)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  imageWrapper: {
    flex: 1,
    minWidth: '300px',
    animation: 'slideInRight 1.5s ease-out',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  }
};

export default Home;
