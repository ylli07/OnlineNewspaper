import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavItems = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Call the logout endpoint
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'World', path: '/world' },
    { id: 3, name: 'Sports', path: '/sports' },
    { id: 4, name: 'Technology', path: '/technology' }
  ];

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
      </ul>
      <div style={styles.authButtons}>
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            style={styles.logoutButton}
            type="button"
          >
            Log Out
          </button>
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
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    border: '2px solid #e74c3c',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#e74c3c',
    },
  },
};

export default NavItems; 