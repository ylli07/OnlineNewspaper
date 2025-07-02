import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', image_url: '', image_caption: '', category_id: '', author_id: '' });
  const [showNewsTable, setShowNewsTable] = useState(false);
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
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNews(data));
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

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', content: '', image_url: '', image_caption: '', category_id: '', author_id: '' });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    fetch(`http://localhost:5000/api/news/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })
      .then(res => res.json())
      .then(updated => {
        setNews(news.map(n => n.id === editingId ? updated : n));
        cancelEdit();
      });
  };

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
        <section style={styles.section}>
          <h2>Add News</h2>
          {/* Add News Form will go here */}
        </section>
        <section style={styles.section}>
          <h2>Manage News</h2>
          <button style={{marginBottom: '1rem', padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer'}} onClick={() => setShowNewsTable(!showNewsTable)}>
            {showNewsTable ? 'Hide News Table' : 'Manage News'}
          </button>
          {showNewsTable && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Photo</th>
                  <th>Photo Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(news) ? news.map(item => (
                  <tr key={item.id}>
                    <td>{editingId === item.id ? <input name="title" value={editForm.title} onChange={handleChange} /> : item.title}</td>
                    <td>{editingId === item.id ? <input name="image_url" value={editForm.image_url} onChange={handleChange} /> : <img src={item.image_url} alt="" style={{ width: 80 }} />}</td>
                    <td>{editingId === item.id ? <input name="image_caption" value={editForm.image_caption} onChange={handleChange} /> : item.image_caption}</td>
                    <td>
                      {editingId === item.id ? (
                        <>
                          <button onClick={saveEdit}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => startEdit(item)}>Edit</button>
                      )}
                    </td>
                  </tr>
                )) : <tr><td colSpan="4">No news found or error loading news.</td></tr>}
              </tbody>
            </table>
          )}
        </section>
        <section style={styles.section}>
          <h2>Featured Section</h2>
          <img src={featured.image_url || 'https://via.placeholder.com/600x350?text=Foto+e+klimes'} alt="Featured" style={{ width: '60%', maxWidth: 400, borderRadius: 10, marginBottom: 10 }} />
          <div style={{ width: '60%', maxWidth: 400, fontStyle: 'italic', color: '#555', textAlign: 'center', marginBottom: 10 }}>
            {featured.description}
          </div>
          <button style={{marginBottom: '1rem', padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer'}} onClick={() => setShowFeaturedEdit(!showFeaturedEdit)}>
            {showFeaturedEdit ? 'Cancel' : 'Edit Featured'}
          </button>
          {showFeaturedEdit && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input name="image_url" value={featuredEdit.image_url} onChange={handleFeaturedChange} placeholder="Image URL" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
              <textarea name="description" value={featuredEdit.description} onChange={handleFeaturedChange} placeholder="Përshkrimi..." style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} rows={3} />
              <button onClick={saveFeatured} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>Save</button>
            </div>
          )}
        </section>
        <section style={styles.section}>
          <h2>Latest News Section</h2>
          <img src={latestNews.image_url || 'https://via.placeholder.com/600x350?text=Latest+News'} alt="Latest News" style={{ width: '60%', maxWidth: 400, borderRadius: 10, marginBottom: 10 }} />
          <div style={{ width: '60%', maxWidth: 400, fontStyle: 'italic', color: '#555', textAlign: 'center', marginBottom: 10 }}>
            {latestNews.description}
          </div>
          <button style={{marginBottom: '1rem', padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer'}} onClick={() => setShowLatestNewsEdit(!showLatestNewsEdit)}>
            {showLatestNewsEdit ? 'Cancel' : 'Edit Latest News'}
          </button>
          {showLatestNewsEdit && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input name="image_url" value={latestNewsEdit.image_url} onChange={handleLatestNewsChange} placeholder="Image URL" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
              <textarea name="description" value={latestNewsEdit.description} onChange={handleLatestNewsChange} placeholder="Përshkrimi..." style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} rows={3} />
              <button onClick={saveLatestNews} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>Save</button>
            </div>
          )}
        </section>
        <section style={styles.section}>
          <h2>Photo Gallery Management</h2>
          <div style={{ marginBottom: '1rem' }}>
            <h3>Add New Gallery Item</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1rem' }}>
              <input name="image_url" value={newGalleryItem.image_url} onChange={handleNewGalleryChange} placeholder="Image URL" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
              <textarea name="image_caption" value={newGalleryItem.image_caption} onChange={handleNewGalleryChange} placeholder="Përshkrimi i fotos..." style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} rows={2} />
              <input name="gallery_order" type="number" value={newGalleryItem.gallery_order} onChange={handleNewGalleryChange} placeholder="Renditja (1, 2, 3...)" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
              <button onClick={addGalleryItem} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>Add Gallery Item</button>
            </div>
          </div>
          <div>
            <h3>Edit Gallery Items</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {gallery.map(item => (
                <div key={item.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: 5 }}>
                  <img src={item.image_url} alt="" style={{ width: 100, height: 60, objectFit: 'cover', marginBottom: '0.5rem' }} />
                  {editingGalleryId === item.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <input name="image_url" value={galleryEdit.image_url} onChange={handleGalleryChange} placeholder="Image URL" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
                      <textarea name="image_caption" value={galleryEdit.image_caption} onChange={handleGalleryChange} placeholder="Përshkrimi..." style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} rows={2} />
                      <input name="gallery_order" type="number" value={galleryEdit.gallery_order} onChange={handleGalleryChange} placeholder="Renditja" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={saveGalleryEdit} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>Save</button>
                        <button onClick={cancelGalleryEdit} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p><strong>Caption:</strong> {item.image_caption}</p>
                      <p><strong>Order:</strong> {item.gallery_order}</p>
                      <button onClick={() => startGalleryEdit(item)} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>Edit</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={styles.section}>
          <h2>Sports Content Management</h2>
          <div style={{ marginBottom: '1rem' }}>
            <h3>Add New Sports Item</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1rem' }}>
              <input name="image_url" value={newSportsItem.image_url} onChange={handleNewSportsChange} placeholder="Image URL" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
              <textarea name="image_caption" value={newSportsItem.image_caption} onChange={handleNewSportsChange} placeholder="Përshkrimi i fotos..." style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} rows={2} />
              <input name="sports_order" type="number" value={newSportsItem.sports_order} onChange={handleNewSportsChange} placeholder="Renditja (1, 2, 3...)" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
              <button onClick={addSportsItem} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>Add Sports Item</button>
            </div>
          </div>
          <div>
            <h3>Edit Sports Items</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {sportsContent.map(item => (
                <div key={item.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: 5 }}>
                  <img src={item.image_url} alt="" style={{ width: 100, height: 60, objectFit: 'cover', marginBottom: '0.5rem' }} />
                  {editingSportsId === item.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <input name="image_url" value={sportsContentEdit.image_url} onChange={handleSportsContentChange} placeholder="Image URL" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
                      <textarea name="image_caption" value={sportsContentEdit.image_caption} onChange={handleSportsContentChange} placeholder="Përshkrimi..." style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} rows={2} />
                      <input name="sports_order" type="number" value={sportsContentEdit.sports_order} onChange={handleSportsContentChange} placeholder="Renditja" style={{ padding: '0.5rem', borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }} />
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={saveSportsContent} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>Save</button>
                        <button onClick={cancelSportsEdit} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p><strong>Caption:</strong> {item.image_caption}</p>
                      <p><strong>Order:</strong> {item.sports_order}</p>
                      <button onClick={() => startSportsEdit(item)} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>Edit</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={styles.section}>
          <h2>Manage Comments</h2>
          {/* Comments Management will go here */}
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    background: '#f7f9fc',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  sections: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  section: {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '2rem',
    minWidth: '300px',
    flex: '1 1 300px',
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
};

export default AdminDashboard; 