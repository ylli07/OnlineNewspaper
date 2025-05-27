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
    <ul style={styles.navLinks}>
      {navItems.map(item => (
        <li key={item.id} style={styles.navItem}>
          <Link to={item.path} style={styles.link}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  navItem: {
    userSelect: 'none',
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#3498db',
    },
  },
};

export default NavItems; 