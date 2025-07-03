import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/auth';

const ManageAccount = () => {
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/120?text=Profile');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwError, setPwError] = useState('');

  // Fetch user info on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch(`${API_URL}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUsername(data.username || '');
        setEmail(data.email || '');
        setProfilePic(data.profile_pic || 'https://via.placeholder.com/120?text=Profile');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, email, profile_pic: profilePic })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Profile updated') setMessage('Profile updated!');
        else setError(data.message || 'Update failed');
      })
      .catch(() => setError('Update failed'));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwMessage(''); setPwError('');
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Password changed successfully') {
          setPwMessage('Password changed successfully!');
          setCurrentPassword(''); setNewPassword('');
        } else setPwError(data.message || 'Change failed');
      })
      .catch(() => setPwError('Change failed'));
  };

  if (loading) return <div style={styles.container}><p>Loading...</p></div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.picSection}>
          <img src={profilePic} alt="Profile" style={styles.profilePic} />
          <input type="file" accept="image/*" onChange={handlePicChange} style={styles.fileInput} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={styles.input} placeholder="Enter new username" />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} placeholder="Enter new email" />
        </div>
        <button type="submit" style={styles.saveButton}>Save Changes</button>
        {message && <div style={styles.message}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}
      </form>
      <hr style={{ margin: '2rem 0' }} />
      <form onSubmit={handleChangePassword} style={styles.form}>
        <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Change Password</h3>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Current Password</label>
          <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={styles.input} placeholder="Current password" />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>New Password</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={styles.input} placeholder="New password" />
        </div>
        <button type="submit" style={styles.saveButton}>Change Password</button>
        {pwMessage && <div style={styles.message}>{pwMessage}</div>}
        {pwError && <div style={styles.error}>{pwError}</div>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '3rem auto',
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.7rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  picSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #3498db',
    marginBottom: 8,
  },
  fileInput: {
    fontSize: '0.95rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.3rem',
  },
  label: {
    fontWeight: 500,
    color: '#2c3e50',
    fontSize: '1rem',
  },
  input: {
    padding: '0.7rem',
    borderRadius: 5,
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
  },
  saveButton: {
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    padding: '0.8rem',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '1rem',
  },
  message: {
    marginTop: '1rem',
    color: '#27ae60',
    fontWeight: 500,
  },
  error: {
    marginTop: '1rem',
    color: '#e74c3c',
    fontWeight: 500,
  },
};

export default ManageAccount; 