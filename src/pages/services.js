// src/pages/services.js
import React, { useEffect } from 'react';

const services = [
  {
    title: 'Web Development',
    description: 'We build scalable and fast web apps tailored to your needs.',
  },
  {
    title: 'Cloud Solutions',
    description: 'Deploy your app with our secure and flexible cloud services.',
  },
  {
    title: 'DevOps Support',
    description: 'Streamline your CI/CD pipeline and infrastructure.',
  },
  {
    title: 'API Integration',
    description: 'We create robust and secure APIs for all your integrations.',
  },
];

export default function Services() {
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 200);
    });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Services</h2>
      <div style={styles.cardWrapper}>
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            style={{ ...styles.card, transitionDelay: `${index * 0.2}s` }}
          >
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p style={styles.cardText}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#0e1a2b',
    color: '#fff',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px',
  },
  cardWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    background: '#1e2b3a',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'all 0.6s ease',
  },
  cardTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '16px',
    color: '#ccc',
  },
};
