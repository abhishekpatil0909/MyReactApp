import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Our Company</h1>

      <div style={styles.section}>
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Team working"
          style={styles.image}
        />
        <div style={styles.text}>
          <h2>Who We Are</h2>
          <p>
            We are a passionate team of developers, designers, and tech
            enthusiasts who believe in building meaningful solutions. Our goal
            is to bridge the gap between technology and everyday life.
          </p>
        </div>
      </div>

      <div style={styles.sectionReverse}>
        <div style={styles.text}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower businesses and individuals with
            cutting-edge web and software solutions. We focus on clean design,
            performance, and scalable architecture.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Our Mission"
          style={styles.image}
        />
      </div>

      <div style={styles.section}>
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Our Vision"
          style={styles.image}
        />
        <div style={styles.text}>
          <h2>Our Vision</h2>
          <p>
            We envision a future where digital innovation improves lives. We are
            committed to making the web a better place through creativity and
            smart engineering.
          </p>
        </div>
      </div>

      
    </div>
  );
};

// Internal CSS
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
    backgroundColor: '#f4f4f4',
    color: '#333',
  },
  header: {
    textAlign: 'center',
    fontSize: '42px',
    marginBottom: '40px',
    color: '#2c3e50',
  },
  section: {
    display: 'flex',
    gap: '30px',
    marginBottom: '50px',
    alignItems: 'center',
  },
  sectionReverse: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: '30px',
    marginBottom: '50px',
    alignItems: 'center',
  },
  image: {
    width: '45%',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  text: {
    flex: 1,
    fontSize: '18px',
    lineHeight: '1.6',
  },
  footer: {
    textAlign: 'center',
    marginTop: '60px',
    padding: '20px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    borderRadius: '8px',
  },
};

export default About;
