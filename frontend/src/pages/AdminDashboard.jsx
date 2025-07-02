import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.sections}>
        <section style={styles.section}>
          <h2>Add News</h2>
          {/* Add News Form will go here */}
        </section>
        <section style={styles.section}>
          <h2>Manage News</h2>
          {/* News List with Edit/Delete will go here */}
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
};

export default AdminDashboard; 