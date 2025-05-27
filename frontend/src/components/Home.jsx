import React, { useEffect, useState } from 'react';
import NavItems from './NavItems';

export default function Home() {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        // Set first 3 news items as featured
        setFeaturedNews(data.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Online Newspaper</div>
        <NavItems />
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        {/* Featured News Section */}
        <section style={styles.featuredSection}>
          <h2 style={styles.sectionTitle}>Featured Stories</h2>
          <div style={styles.featuredGrid}>
            {featuredNews.map(({ id, title, summary, category, imageUrl }) => (
              <div key={id} style={styles.featuredBox}>
                <div style={styles.imageContainer}>
                  <img 
                    src={imageUrl || 'https://via.placeholder.com/400x250'} 
                    alt={title}
                    style={styles.featuredImage}
                  />
                </div>
                <h3 style={styles.featuredTitle}>{title}</h3>
                <p style={styles.category}>{category}</p>
                <p style={styles.summary}>{summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section style={styles.latestSection}>
          <h2 style={styles.sectionTitle}>Latest News</h2>
          <div style={styles.newsGrid}>
            {news.map(({ id, title, summary, category }) => (
              <div key={id} style={styles.newsBox}>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.category}>{category}</p>
                <p>{summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section style={styles.gallerySection}>
          <h2 style={styles.sectionTitle}>Photo Gallery</h2>
          <div style={styles.galleryGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} style={styles.galleryItem}>
                <img 
                  src={`https://source.unsplash.com/random/300x200?sig=${item}`}
                  alt={`Gallery item ${item}`}
                  style={styles.galleryImage}
                />
                <p style={styles.galleryCaption}>News Photo {item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>About Us</h3>
            <p>Your trusted source for the latest news and updates from around the world.</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <ul style={styles.footerLinks}>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Advertise</li>
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
          <p>&copy; 2024 Online Newspaper. All rights reserved.</p>
        </div>
      </footer>
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
  main: {
    padding: '2rem 4rem',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  featuredSection: {
    marginBottom: '4rem',
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  featuredBox: {
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
  featuredImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  featuredTitle: {
    fontSize: '1.5rem',
    margin: '1rem',
    color: '#2c3e50',
  },
  latestSection: {
    marginBottom: '4rem',
  },
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  newsBox: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  category: {
    color: '#3498db',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  gallerySection: {
    marginBottom: '4rem',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  galleryItem: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  galleryImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  galleryCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0.5rem',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    margin: 0,
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '3rem 4rem 1rem',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerSection: {
    marginBottom: '1.5rem',
  },
  footerTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#3498db',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: '#3498db',
    },
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
};
