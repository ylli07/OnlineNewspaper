import React, { useEffect, useState } from 'react';

export default function Technology() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news?category=technology')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={() => window.history.back()} style={styles.backButton}>←</button>
      <h1 style={styles.title}>Technology News</h1>
      <div style={styles.imageContainer}>
        <img src="/path/to/image1.jpg" alt="Technology Image 1" style={styles.image} />
        <img src="/path/to/image2.jpg" alt="Technology Image 2" style={styles.image} />
      </div>
      <div style={styles.descriptionContainer}>
        <h3>About Technology</h3>
        <p>Write something about technology here...</p>
      </div>
      <div style={styles.newsGrid}>
        {news.map(({ id, title, summary, imageUrl }) => (
          <div key={id} style={styles.newsCard}>
            <div style={styles.imageContainer}>
              <img 
                src={imageUrl || 'https://via.placeholder.com/400x250'} 
                alt={title}
                style={styles.image}
              />
            </div>
            <div style={styles.content}>
              <h2 style={styles.newsTitle}>{title}</h2>
              <p style={styles.summary}>{summary}</p>
            </div>
          </div>
        ))}
      </div>
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>About Us</h3>
            <p style={styles.footerText}>Your trusted source for the latest news and updates from around the world.</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLinkItem}>Contact Us</li>
              <li style={styles.footerLinkItem}>Privacy Policy</li>
              <li style={styles.footerLinkItem}>Terms of Service</li>
              <li style={styles.footerLinkItem}>Advertise</li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Follow Us</h3>
            <div style={styles.socialLinks}>
              <span style={styles.socialIcon}>Facebook</span>
              <span style={styles.socialIcon}>Twitter</span>
              <span style={styles.socialIcon}>Instagram</span>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>&copy; 2024 Online Newspaper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem 4rem',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  image: {
    width: '45%',
    height: 'auto',
    objectFit: 'cover',
  },
  content: {
    padding: '1.5rem',
  },
  newsTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  summary: {
    color: '#666',
    lineHeight: '1.6',
  },
  descriptionContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  backButton: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#2c3e50',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    padding: '2rem',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footerSection: {
    flex: 1,
  },
  footerTitle: {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '1rem',
  },
  footerText: {
    color: '#fff',
    lineHeight: '1.6',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
  },
  footerLinkItem: {
    color: '#fff',
    marginBottom: '0.5rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialIcon: {
    color: '#fff',
    cursor: 'pointer',
  },
  footerBottom: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  copyright: {
    color: '#fff',
  },
}; 