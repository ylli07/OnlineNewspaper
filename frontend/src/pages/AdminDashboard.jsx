import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', image_url: '', image_caption: '', category_id: '', author_id: '' });
  const [showNewsTable, setShowNewsTable] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNews(data));
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