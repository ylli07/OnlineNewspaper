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

  const saveLatestNews = () => {
    const id = latestNews.id || 1;
    fetch(`http://localhost:5000/api/latest-news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latestNewsEdit)
    })
      .then(res => res.json())
      .then(updated => {
        setLatestNews({ ...latestNews, ...latestNewsEdit });
        setShowLatestNewsEdit(false);
      });
  };

  const handleLatestNewsChange = (e) => {
    setLatestNewsEdit({ ...latestNewsEdit, [e.target.name]: e.target.value });
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