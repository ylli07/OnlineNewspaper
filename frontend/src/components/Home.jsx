import React, { useEffect, useState } from 'react';
import NavItems from './NavItems';

export default function Home() {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featured, setFeatured] = useState({ image_url: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setNews(data);
        setFeaturedNews(data.slice(0, 3));
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setNews([]);
        setFeaturedNews([]);
      });
    fetch('http://localhost:5000/api/featured')
      .then(res => res.json())
      .then(data => setFeatured(data));
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoText}>Online</span>
          <span style={styles.logoHighlight}>Newspaper</span>
        </div>
        <NavItems />
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        {/* Featured News Section */}
        <section style={styles.featuredSection}>
          <h2 style={styles.sectionTitle}>Featured Stories</h2>
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              Si ndikon ndryshimi i klimës në valët e nxehtësisë?
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <img id="custom-featured-img" src={featured.image_url || 'https://via.placeholder.com/600x350?text=Foto+e+klimes'} alt="Custom Featured" style={{ width: '60%', maxWidth: 600, borderRadius: 10, marginBottom: 10 }} />
            <div style={{ width: '60%', maxWidth: 600, fontStyle: 'italic', color: '#555', textAlign: 'center' }}>
              {featured.description}
            </div>
          </div>
          <div style={styles.featuredGrid}>
            {featuredNews.map(({ id, title, summary, category, imageUrl, image_caption, image_url }) => (
              <div key={id} style={styles.featuredBox}>
                <div style={styles.imageContainer}>
                  <img 
                    src={image_url || imageUrl || 'https://via.placeholder.com/400x250'} 
                    alt={title}
                    style={styles.featuredImage}
                  />
                  <div style={styles.imageCaption}>{image_caption}</div>
                </div>
                <h3 style={styles.featuredTitle}>{title}</h3>
                <p style={styles.category}>{category}</p>
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
                  src={`https://source.unsplash.com/random/600x400?sig=${item}`}
                  alt={`Gallery item ${item}`}
                  style={styles.galleryImage}
                />
                <div style={styles.galleryCaption}>Përshkrimi i fotos {item}</div>
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
    </>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 4rem',
    backgroundColor: '#1a1a1a',
    color: '#ecf0f1',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    display: 'flex',
    gap: '0.5rem',
  },
  logoText: {
    color: '#ecf0f1',
  },
  logoHighlight: {
    color: '#3498db',
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
    height: '350px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  imageCaption: {
    marginTop: '0.5rem',
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
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
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  galleryCaption: {
    marginTop: '0.5rem',
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    color: '#ecf0f1',
    padding: '4rem 4rem 1rem',
    marginTop: '4rem',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem',
  },
  footerSection: {
    marginBottom: '1.5rem',
  },
  footerTitle: {
    fontSize: '1.4rem',
    marginBottom: '1.5rem',
    color: '#3498db',
    fontWeight: '600',
    position: 'relative',
    paddingBottom: '0.5rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '50px',
      height: '2px',
      backgroundColor: '#3498db',
    },
  },
  footerText: {
    color: '#bdc3c7',
    lineHeight: '1.6',
    fontSize: '1rem',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLinkItem: {
    marginBottom: '1rem',
    cursor: 'pointer',
    color: '#bdc3c7',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    '&:hover': {
      color: '#3498db',
      transform: 'translateX(5px)',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  socialIcon: {
    cursor: 'pointer',
    color: '#bdc3c7',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    '&:hover': {
      color: '#3498db',
      transform: 'translateY(-3px)',
    },
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  copyright: {
    color: '#bdc3c7',
    fontSize: '0.9rem',
  },
};
