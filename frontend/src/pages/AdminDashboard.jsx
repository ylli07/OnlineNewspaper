import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [featured, setFeatured] = useState({ id: '', image_url: '', description: '' });
  const [featuredEdit, setFeaturedEdit] = useState({ image_url: '', description: '' });
  const [showFeaturedEdit, setShowFeaturedEdit] = useState(false);
  const [latestNews, setLatestNews] = useState({ id: '', image_url: '', description: '' });
  const [latestNewsEdit, setLatestNewsEdit] = useState({ image_url: '', description: '' });
  const [showLatestNewsEdit, setShowLatestNewsEdit] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [galleryEdit, setGalleryEdit] = useState({ image_url: '', image_caption: '', gallery_order: '' });
  const [showGalleryEdit, setShowGalleryEdit] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [newGalleryItem, setNewGalleryItem] = useState({ image_url: '', image_caption: '', gallery_order: '' });
  const [sportsContent, setSportsContent] = useState([]);
  const [sportsContentEdit, setSportsContentEdit] = useState({ image_url: '', image_caption: '', sports_order: '' });
  const [showSportsContentEdit, setShowSportsContentEdit] = useState(false);
  const [editingSportsId, setEditingSportsId] = useState(null);
  const [newSportsItem, setNewSportsItem] = useState({ image_url: '', image_caption: '', sports_order: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/featured')
      .then(res => res.json())
      .then(data => {
        setFeatured(data);
        setFeaturedEdit({ image_url: data.image_url || '', description: data.description || '' });
      });
    fetch('http://localhost:5000/api/latest-news')
      .then(res => res.json())
      .then(data => {
        setLatestNews(data);
        setLatestNewsEdit({ image_url: data.image_url || '', description: data.description || '' });
      });
    fetch('http://localhost:5000/api/gallery')
      .then(res => res.json())
      .then(data => setGallery(data));
    fetch('http://localhost:5000/api/sports-content')
      .then(res => res.json())
      .then(data => setSportsContent(data));
  }, []);

  const handleFeaturedChange = (e) => {
    setFeaturedEdit({ ...featuredEdit, [e.target.name]: e.target.value });
  };

  const saveFeatured = () => {
    const id = featured.id || 1;
    fetch(`http://localhost:5000/api/featured/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(featuredEdit)
    })
      .then(res => res.json())
      .then(updated => {
        setFeatured({ ...featured, ...featuredEdit });
        setShowFeaturedEdit(false);
      });
  };

  const handleLatestNewsChange = (e) => {
    setLatestNewsEdit({ ...latestNewsEdit, [e.target.name]: e.target.value });
  };

  const handleSportsContentChange = (e) => {
    setSportsContentEdit({ ...sportsContentEdit, [e.target.name]: e.target.value });
  };

  const handleNewSportsChange = (e) => {
    setNewSportsItem({ ...newSportsItem, [e.target.name]: e.target.value });
  };

  const startSportsEdit = (item) => {
    setEditingSportsId(item.id);
    setSportsContentEdit({ image_url: item.image_url || '', image_caption: item.image_caption || '', sports_order: item.sports_order || '' });
  };

  const cancelSportsEdit = () => {
    setEditingSportsId(null);
    setSportsContentEdit({ image_url: '', image_caption: '', sports_order: '' });
  };

  const saveSportsContent = () => {
    fetch(`http://localhost:5000/api/sports-content/${editingSportsId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sportsContentEdit)
    })
      .then(res => res.json())
      .then(updated => {
        setSportsContent(sportsContent.map(s => s.id === editingSportsId ? updated : s));
        cancelSportsEdit();
      });
  };

  const addSportsItem = () => {
    fetch('http://localhost:5000/api/sports-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSportsItem)
    })
      .then(res => res.json())
      .then(newItem => {
        setSportsContent([...sportsContent, newItem]);
        setNewSportsItem({ image_url: '', image_caption: '', sports_order: '' });
      });
  };

  const saveLatestNews = () => {
    fetch(`http://localhost:5000/api/latest-news/${latestNews.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latestNewsEdit)
    })
      .then(res => res.json())
      .then(data => {
        setLatestNews({ ...latestNews, ...latestNewsEdit });
        setShowLatestNewsEdit(false);
      });
  };

  const startGalleryEdit = (item) => {
    setEditingGalleryId(item.id);
    setGalleryEdit({ image_url: item.image_url || '', image_caption: item.image_caption || '', gallery_order: item.gallery_order || '' });
  };

  const cancelGalleryEdit = () => {
    setEditingGalleryId(null);
    setGalleryEdit({ image_url: '', image_caption: '', gallery_order: '' });
  };

  const saveGalleryEdit = () => {
    fetch(`http://localhost:5000/api/gallery/${editingGalleryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(galleryEdit)
    })
      .then(res => res.json())
      .then(updated => {
        setGallery(gallery.map(g => g.id === editingGalleryId ? updated : g));
        cancelGalleryEdit();
      });
  };

  const handleGalleryChange = (e) => {
    setGalleryEdit({ ...galleryEdit, [e.target.name]: e.target.value });
  };

  const handleNewGalleryChange = (e) => {
    setNewGalleryItem({ ...newGalleryItem, [e.target.name]: e.target.value });
  };

  const addGalleryItem = () => {
    console.log('Adding gallery item:', newGalleryItem);
    fetch('http://localhost:5000/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGalleryItem)
    })
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(newItem => {
        console.log('New item added:', newItem);
        setGallery([...gallery, newItem]);
        setNewGalleryItem({ image_url: '', image_caption: '', gallery_order: '' });
      })
      .catch(error => {
        console.error('Error adding gallery item:', error);
        alert('Error adding gallery item: ' + error.message);
      });
  };

  return (
    <div style={styles.container}>
      <button onClick={() => window.history.back()} style={styles.backButton}>←</button>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.sections}>
        <section style={styles.compactSection}>
          <h2 style={styles.sectionTitle}>Featured Section</h2>
          <img src={featured.image_url || 'https://via.placeholder.com/600x350?text=Foto+e+klimes'} alt="Featured" style={styles.imagePreview} />
          <div style={styles.description}>
            {featured.description}
          </div>
          <button style={styles.button} onClick={() => setShowFeaturedEdit(!showFeaturedEdit)}>
            {showFeaturedEdit ? 'Cancel' : 'Edit Featured'}
          </button>
          {showFeaturedEdit && (
            <div style={styles.formGroup}>
              <input name="image_url" value={featuredEdit.image_url} onChange={handleFeaturedChange} placeholder="Image URL" style={styles.input} />
              <textarea name="description" value={featuredEdit.description} onChange={handleFeaturedChange} placeholder="Përshkrimi..." style={styles.textarea} rows={3} />
              <button onClick={saveFeatured} style={styles.saveButton}>Save</button>
            </div>
          )}
        </section>
        <section style={styles.compactSection}>
          <h2 style={styles.sectionTitle}>Latest News Section</h2>
          <img src={latestNews.image_url || 'https://via.placeholder.com/600x350?text=Latest+News'} alt="Latest News" style={styles.imagePreview} />
          <div style={styles.description}>
            {latestNews.description}
          </div>
          <button style={styles.button} onClick={() => setShowLatestNewsEdit(!showLatestNewsEdit)}>
            {showLatestNewsEdit ? 'Cancel' : 'Edit Latest News'}
          </button>
          {showLatestNewsEdit && (
            <div style={styles.formGroup}>
              <input name="image_url" value={latestNewsEdit.image_url} onChange={handleLatestNewsChange} placeholder="Image URL" style={styles.input} />
              <textarea name="description" value={latestNewsEdit.description} onChange={handleLatestNewsChange} placeholder="Përshkrimi..." style={styles.textarea} rows={3} />
              <button onClick={saveLatestNews} style={styles.saveButton}>Save</button>
            </div>
          )}
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Photo Gallery Management</h2>
          <div>
            <h3 style={styles.subsectionTitle}>Add New Gallery Item</h3>
            <div style={styles.formGroup}>
              <input name="image_url" value={newGalleryItem.image_url} onChange={handleNewGalleryChange} placeholder="Image URL" style={styles.input} />
              <textarea name="image_caption" value={newGalleryItem.image_caption} onChange={handleNewGalleryChange} placeholder="Përshkrimi i fotos..." style={styles.textarea} rows={2} />
              <input name="gallery_order" type="number" value={newGalleryItem.gallery_order} onChange={handleNewGalleryChange} placeholder="Renditja (1, 2, 3...)" style={styles.input} />
              <button onClick={addGalleryItem} style={styles.saveButton}>Add Gallery Item</button>
            </div>
          </div>
          <div style={styles.galleryGrid}>
            <h3 style={styles.subsectionTitle}>Edit Gallery Items</h3>
            {gallery.map(item => (
              <div key={item.id} style={styles.galleryItem}>
                <img src={item.image_url} alt="" style={styles.galleryImage} />
                {editingGalleryId === item.id ? (
                  <div style={styles.formGroup}>
                    <input name="image_url" value={galleryEdit.image_url} onChange={handleGalleryChange} placeholder="Image URL" style={styles.input} />
                    <textarea name="image_caption" value={galleryEdit.image_caption} onChange={handleGalleryChange} placeholder="Përshkrimi..." style={styles.textarea} rows={2} />
                    <input name="gallery_order" type="number" value={galleryEdit.gallery_order} onChange={handleGalleryChange} placeholder="Renditja" style={styles.input} />
                    <div style={styles.buttonGroup}>
                      <button onClick={saveGalleryEdit} style={styles.saveButton}>Save</button>
                      <button onClick={cancelGalleryEdit} style={styles.cancelButton}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><strong>Caption:</strong> {item.image_caption}</p>
                    <p><strong>Order:</strong> {item.gallery_order}</p>
                    <button onClick={() => startGalleryEdit(item)} style={styles.editButton}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Sports Content Management</h2>
          <div>
            <h3 style={styles.subsectionTitle}>Add New Sports Item</h3>
            <div style={styles.formGroup}>
              <input name="image_url" value={newSportsItem.image_url} onChange={handleNewSportsChange} placeholder="Image URL" style={styles.input} />
              <textarea name="image_caption" value={newSportsItem.image_caption} onChange={handleNewSportsChange} placeholder="Përshkrimi i fotos..." style={styles.textarea} rows={2} />
              <input name="sports_order" type="number" value={newSportsItem.sports_order} onChange={handleNewSportsChange} placeholder="Renditja (1, 2, 3...)" style={styles.input} />
              <button onClick={addSportsItem} style={styles.saveButton}>Add Sports Item</button>
            </div>
          </div>
          <div style={styles.galleryGrid}>
            <h3 style={styles.subsectionTitle}>Edit Sports Items</h3>
            {sportsContent.map(item => (
              <div key={item.id} style={styles.galleryItem}>
                <img src={item.image_url} alt="" style={styles.galleryImage} />
                {editingSportsId === item.id ? (
                  <div style={styles.formGroup}>
                    <input name="image_url" value={sportsContentEdit.image_url} onChange={handleSportsContentChange} placeholder="Image URL" style={styles.input} />
                    <textarea name="image_caption" value={sportsContentEdit.image_caption} onChange={handleSportsContentChange} placeholder="Përshkrimi..." style={styles.textarea} rows={2} />
                    <input name="sports_order" type="number" value={sportsContentEdit.sports_order} onChange={handleSportsContentChange} placeholder="Renditja" style={styles.input} />
                    <div style={styles.buttonGroup}>
                      <button onClick={saveSportsContent} style={styles.saveButton}>Save</button>
                      <button onClick={cancelSportsEdit} style={styles.cancelButton}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><strong>Caption:</strong> {item.image_caption}</p>
                    <p><strong>Order:</strong> {item.sports_order}</p>
                    <button onClick={() => startSportsEdit(item)} style={styles.editButton}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Manage Comments</h2>
          {/* Comments Management will go here */}
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    color: '#fff',
    marginBottom: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  sections: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  section: {
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    padding: '2rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255,255,255,0.2)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
    },
  },
  compactSection: {
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    padding: '1.5rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255,255,255,0.2)',
    maxHeight: '500px',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
    },
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    fontWeight: '600',
    borderBottom: '3px solid #667eea',
    paddingBottom: '0.5rem',
  },
  subsectionTitle: {
    fontSize: '1.3rem',
    color: '#34495e',
    marginBottom: '1rem',
    fontWeight: '500',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: '#5a6fd8',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
    },
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid #e1e8ed',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid #e1e8ed',
    fontSize: '1rem',
    resize: 'vertical',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  imagePreview: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '10px',
    marginBottom: '1rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  description: {
    width: '100%',
    maxWidth: '300px',
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    fontSize: '0.9rem',
    maxHeight: '80px',
    overflow: 'hidden',
  },
  galleryGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '1rem',
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '1rem',
    scrollbarWidth: 'thin',
    scrollbarColor: '#667eea #f1f1f1',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#667eea',
      borderRadius: '4px',
      '&:hover': {
        background: '#5a6fd8',
      },
    },
  },
  galleryItem: {
    border: '2px solid #e1e8ed',
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#667eea',
      backgroundColor: '#fff',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
  },
  galleryImage: {
    width: '120px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  saveButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#229954',
      transform: 'translateY(-1px)',
    },
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#c0392b',
      transform: 'translateY(-1px)',
    },
  },
  editButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#2980b9',
      transform: 'translateY(-1px)',
    },
  },
  backButton: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    fontSize: '1.5rem',
    color: '#2c3e50',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#fff',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
  },
};

export default AdminDashboard; 