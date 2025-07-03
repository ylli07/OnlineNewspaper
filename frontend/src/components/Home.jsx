import React, { useEffect, useState } from 'react';
import NavItems from './NavItems';

export default function Home() {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featured, setFeatured] = useState({ image_url: '', description: '' });
  const [latestNews, setLatestNews] = useState({ image_url: '', description: '' });
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Check server health first
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(health => {
        console.log('Server health:', health);
      })
      .catch(err => {
        console.error('Server health check failed:', err);
        setError('Server connection failed');
      });

    fetch('http://localhost:5000/api/news')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setNews(data);
        // Filter out gallery items and sports items from featured news
        const nonGalleryNews = data.filter(item => !item.gallery_order && !item.sports_order);
        setFeaturedNews(nonGalleryNews.slice(0, 3));
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setNews([]);
        setFeaturedNews([]);
        setError('Failed to load news');
      });
    fetch('http://localhost:5000/api/featured')
      .then(res => res.json())
      .then(data => setFeatured(data))
      .catch(err => console.error('Error fetching featured:', err));
    fetch('http://localhost:5000/api/latest-news')
      .then(res => res.json())
      .then(data => setLatestNews(data))
      .catch(err => console.error('Error fetching latest news:', err));
    fetch('http://localhost:5000/api/gallery')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Gallery data received:', data);
        setGallery(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching gallery:', err);
        setGallery([]);
        setError('Failed to load gallery');
        setLoading(false);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/api/news/search?query=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults(null);
  };

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
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem', marginRight: '2rem' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search news..."
            style={{ padding: '0.4rem', borderRadius: 4, border: '1px solid #ccc', width: 180, fontSize: '0.95rem', marginRight: 8 }}
          />
          <button type="submit" style={{ padding: '0.4rem 1rem', borderRadius: 4, border: 'none', background: '#3498db', color: 'white', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}>Search</button>
          {searchResults !== null && (
            <button type="button" onClick={handleClearSearch} style={{ marginLeft: 8, padding: '0.4rem 1rem', borderRadius: 4, border: 'none', background: '#e74c3c', color: 'white', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}>Clear</button>
          )}
        </form>
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <img src={latestNews.image_url || 'https://via.placeholder.com/600x350?text=Latest+News'} alt="Latest News" style={{ width: '60%', maxWidth: 600, borderRadius: 10, marginBottom: 10 }} />
            <div style={{ width: '60%', maxWidth: 600, fontStyle: 'italic', color: '#555', textAlign: 'center', marginBottom: 10 }}>
              {latestNews.description}
            </div>
          </div>
          <div style={styles.newsGrid}>
            {(searchResults !== null ? searchResults : news).filter(item => !item.gallery_order && !item.sports_order).map(({ id, title, summary, category }) => (
              <div key={id} style={styles.newsBox}>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.category}>{category}</p>
                <p>{summary}</p>
              </div>
            ))}
            {(searchResults !== null && searchResults.length === 0) && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666' }}>
                <p>No news found for your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section style={styles.gallerySection}>
          <h2 style={styles.sectionTitle}>Photo Gallery</h2>
          {error && (
            <div style={styles.errorMessage}>
              <p>Error: {error}</p>
              <p>Please check if the backend server is running on port 5000</p>
            </div>
          )}
          {loading && (
            <div style={styles.loadingMessage}>
              <p>Loading gallery...</p>
            </div>
          )}
          <div style={styles.galleryGrid}>
            {gallery.length > 0 ? gallery.map((item) => (
              <div key={item.id} style={styles.galleryItem}>
                <img 
                  src={item.image_url}
                  alt={`Gallery item ${item.id}`}
                  style={styles.galleryImage}
                  onError={(e) => {
                    console.error('Image failed to load:', item.image_url);
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
                <div style={styles.galleryCaption}>{item.image_caption}</div>
              </div>
            )) : !loading && !error ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666' }}>
                <p>Asnjë foto në galeri. Shto foto nga admin dashboard.</p>
                <p>Gallery items count: {gallery.length}</p>
              </div>
            ) : null}
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
              <li style={styles.footerLinkItem}>
                <div style={styles.linkTitle}>Contact Us</div>
                <div style={styles.linkDescription}>Na kontaktoni për pyetje, sugjerime dhe mbështetje teknike</div>
              </li>
              <li style={styles.footerLinkItem}>
                <div style={styles.linkTitle}>Privacy Policy</div>
                <div style={styles.linkDescription}>Si mbrojmë dhe përdorim të dhënat tuaja personale</div>
              </li>
              <li style={styles.footerLinkItem}>
                <div style={styles.linkTitle}>Terms of Service</div>
                <div style={styles.linkDescription}>Kushtet dhe rregullat e përdorimit të platformës sonë</div>
              </li>
              <li style={styles.footerLinkItem}>
                <div style={styles.linkTitle}>Advertise</div>
                <div style={styles.linkDescription}>Mundësitë për reklamim dhe promovim në platformën tonë</div>
              </li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Follow Us</h3>
            <div style={styles.socialLinks}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                Facebook
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                Twitter
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                Instagram
              </a>
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
  linkTitle: {
    fontWeight: '600',
    color: '#ecf0f1',
    marginBottom: '0.3rem',
    fontSize: '1rem',
  },
  linkDescription: {
    fontSize: '0.85rem',
    color: '#95a5a6',
    lineHeight: '1.4',
    fontStyle: 'italic',
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
    textDecoration: 'none',
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
  errorMessage: {
    backgroundColor: '#fdf2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  loadingMessage: {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    color: '#2563eb',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};
