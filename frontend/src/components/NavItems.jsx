import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = () => {
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
        <Link to="/login" style={styles.loginButton}>
          Login
        </Link>
        <Link to="/signup" style={styles.signupButton}>
          Sign Up
        </Link>
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
};

export default NavItems; 