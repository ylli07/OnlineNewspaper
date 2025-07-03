import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Simple JWT decode function to get payload
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const NavItems = () => {
  const navItems = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'World', path: '/world' },
    { id: 3, name: 'Sports', path: '/sports' },
    { id: 4, name: 'Technology', path: '/technology' }
  ];

  // Check if user is admin and get role
  let isAdmin = false;
  let role = null;
  let username = null;
  const token = localStorage.getItem('token');
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/40?text=U');

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.profile_pic) setProfilePic(data.profile_pic);
      });
  }, []);

  if (token) {
    const payload = parseJwt(token);
    if (payload) {
      role = payload.role;
      username = payload.username;
      if (role === 'admin') {
        isAdmin = true;
      }
    }
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div style={styles.navContainer}>
      <ul style={styles.navLinks}>
        {navItems.map(item => (
          <li key={item.id} style={styles.navItem}>
            <Link to={item.path} style={styles.link}>
              {item.name}
            </Link>
          </li>
        ))}
        {isAdmin && (
          <li style={styles.navItem}>
            <Link to="/admin" style={styles.link}>
              Admin Dashboard
            </Link>
          </li>
        )}
      </ul>
      <div style={styles.authButtons}>
        {token ? (
          <>
            <span style={{ color: '#fff', marginRight: '1rem', fontSize: '0.95rem' }}>
              Logged in as: <b>{username}</b> ({role})
            </span>
            <Link to="/account" style={styles.manageButton}>Manage Account</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            <img src={profilePic} alt="Profile" style={styles.profilePic} />
          </>
        ) : (
          <>
            <Link to="/login" style={styles.loginButton}>
              Login
            </Link>
            <Link to="/signup" style={styles.signupButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '2.5rem',
    margin: 0,
    padding: 0,
  },
  navItem: {
    userSelect: 'none',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '0',
      height: '2px',
      bottom: '-4px',
      left: '0',
      backgroundColor: '#3498db',
      transition: 'width 0.3s ease',
    },
    '&:hover::after': {
      width: '100%',
    },
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#3498db',
    },
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    border: '2px solid #3498db',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#3498db',
    },
  },
  signupButton: {
    backgroundColor: 'transparent',
    color: '#3498db',
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    border: '2px solid #3498db',
    '&:hover': {
      backgroundColor: '#3498db',
      color: '#fff',
    },
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '0.5rem 1.2rem',
    borderRadius: '25px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginLeft: '0.5rem',
  },
  manageButton: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '0.5rem 1.2rem',
    borderRadius: '25px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginRight: '0.5rem',
    textDecoration: 'none',
    display: 'inline-block',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover',
    marginLeft: '0.7rem',
    border: '2px solid #3498db',
  },
};

export default NavItems; 