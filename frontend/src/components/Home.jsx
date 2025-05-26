import React, { useEffect, useState } from 'react';

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Online Newspaper</div>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>Home</li>
          <li style={styles.navItem}>World</li>
          <li style={styles.navItem}>Sports</li>
          <li style={styles.navItem}>Technology</li>
          <li style={styles.navItem}>Politics</li>
          <li style={styles.navItem}>Health</li>
        </ul>
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        <h1 style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}>Latest News</h1>
        <div style={styles.newsGrid}>
          {news.map(({ id, title, summary, category }) => (
            <div key={id} style={styles.newsBox}>
              <h3 style={styles.title}>{title}</h3>
              <p style={styles.category}>{category}</p>
              <p>{summary}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 3rem',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
  },
  navItem: {
    userSelect: 'none',
  },
  main: {
    padding: '2rem 4rem',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
  },
  newsGrid: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  newsBox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    maxWidth: '300px',
  },
  title: {
    margin: '0 0 0.5rem 0',
  },
  category: {
    color: '#3498db',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
};
