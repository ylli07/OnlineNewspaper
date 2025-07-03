import React, { useEffect, useState } from 'react';

export default function Sports() {
  const [news, setNews] = useState([]);
  const [sportsContent, setSportsContent] = useState([]);
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/news?category=sports')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
    fetch('http://localhost:5000/api/sports-content')
      .then(res => res.json())
      .then(data => setSportsContent(data));
  }, []);

  const fetchComments = async (newsId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/news/${newsId}/comments`);
      if (!res.ok) {
        setComments(prev => ({ ...prev, [newsId]: [] }));
        return;
      }
      const data = await res.json();
      setComments(prev => ({ ...prev, [newsId]: data }));
    } catch (err) {
      setComments(prev => ({ ...prev, [newsId]: [] }));
    }
  };

  const handleCommentInput = (newsId, value) => {
    setCommentInputs(prev => ({ ...prev, [newsId]: value }));
  };

  const handleCommentSubmit = async (newsId) => {
    const text = commentInputs[newsId];
    if (!text) return;
    try {
      await fetch(`http://localhost:5000/api/news/${newsId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: 'Anonymous', text })
      });
      setCommentInputs(prev => ({ ...prev, [newsId]: '' }));
      fetchComments(newsId);
    } catch (err) {}
  };

  // Fetch comments when news loads
  useEffect(() => {
    news.forEach(item => fetchComments(item.id));
  }, [news]);

  return (
    <div style={styles.container}>
      <button onClick={() => window.history.back()} style={styles.backButton}>←</button>
      <h1 style={styles.title}>Sports News</h1>
      <div style={styles.imageContainer}>
        {sportsContent.length > 0 ? (
          <>
            <div style={styles.topImageBox}>
              <img src={sportsContent[0]?.image_url || 'https://via.placeholder.com/600x350?text=Sports+Image+1'} alt="Sports Image 1" style={styles.topImage} />
              <div style={styles.imageCaption}>{sportsContent[0]?.image_caption || 'Përshkrimi i fotos 1'}</div>
            </div>
            <div style={styles.topImageBox}>
              <img src={sportsContent[1]?.image_url || 'https://via.placeholder.com/600x350?text=Sports+Image+2'} alt="Sports Image 2" style={styles.topImage} />
              <div style={styles.imageCaption}>{sportsContent[1]?.image_caption || 'Përshkrimi i fotos 2'}</div>
            </div>
          </>
        ) : (
          <>
            <div style={styles.topImageBox}>
              <img src="https://via.placeholder.com/600x350?text=Sports+Image+1" alt="Sports Image 1" style={styles.topImage} />
              <div style={styles.imageCaption}>Përshkrimi i fotos 1</div>
            </div>
            <div style={styles.topImageBox}>
              <img src="https://via.placeholder.com/600x350?text=Sports+Image+2" alt="Sports Image 2" style={styles.topImage} />
              <div style={styles.imageCaption}>Përshkrimi i fotos 2</div>
            </div>
          </>
        )}
      </div>
      <div style={styles.descriptionContainer}>
        <h3>About Sports</h3>
        <p>Write something about sports here...</p>
      </div>
      <div style={styles.newsGrid}>
        {Array.isArray(news) ? news.filter(item => !item.gallery_order && !item.sports_order).map(({ id, title, summary, imageUrl, image_caption, image_url }) => (
          <div key={id} style={styles.newsCard}>
            <div style={styles.imageContainer}>
              <img 
                src={image_url && image_url.startsWith('http') ? image_url : 'https://via.placeholder.com/600x350?text=No+Image'} 
                alt={title}
                style={styles.newsImage}
              />
              <div style={styles.imageCaption}>{image_caption}</div>
            </div>
            <div style={styles.content}>
              <h2 style={styles.newsTitle}>{title}</h2>
              <p style={styles.summary}>{summary}</p>
            </div>
            {/* Comments Section */}
            <div style={{marginTop: '1em'}}>
              <h4>Comments</h4>
              <div>
                {(comments[id] || []).map(comment => (
                  <div key={comment.id} style={{borderBottom: '1px solid #eee', marginBottom: '0.5em'}}>
                    <b>{comment.user}:</b> {comment.text} <span style={{fontSize: '0.8em', color: '#888'}}>{new Date(comment.created_at).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInputs[id] || ''}
                onChange={e => handleCommentInput(id, e.target.value)}
                style={{width: '80%'}}
              />
              <button onClick={() => handleCommentSubmit(id)} style={{marginLeft: '0.5em'}}>Submit</button>
            </div>
          </div>
        )) : <p>No news found.</p>}
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
  topImageBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%',
  },
  topImage: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  newsImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  imageCaption: {
    marginTop: '0.5rem',
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
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
    textDecoration: 'none',
  },
  footerBottom: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  copyright: {
    color: '#fff',
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
}; 