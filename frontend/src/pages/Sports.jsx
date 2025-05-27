import React, { useEffect, useState } from 'react';

export default function Sports() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news?category=sports')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sports News</h1>
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
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
}; 