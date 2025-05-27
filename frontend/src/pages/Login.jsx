import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItems from '../components/NavItems';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', formData);
  };

  return (
    <>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoText}>Online</span>
          <span style={styles.logoHighlight}>Newspaper</span>
        </div>
        <NavItems />
      </nav>

      {/* Login Form */}
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please sign in to continue</p>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your password"
                required
              />
            </div>

            <div style={styles.forgotPassword}>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" style={styles.submitButton}>
              Sign In
            </button>

            <div style={styles.registerLink}>
              Don't have an account?{' '}
              <Link to="/register" style={styles.link}>
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 4rem',
    backgroundColor: '#1a1a1a',
    color: '#ecf0f1',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    display: 'flex',
    gap: '0.5rem',
  },
  logoText: {
    color: '#ecf0f1',
  },
  logoHighlight: {
    color: '#3498db',
  },
  container: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f9fc',
    padding: '2rem',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: '#2c3e50',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#3498db',
    },
  },
  forgotPassword: {
    textAlign: 'right',
  },
  forgotLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontSize: '0.9rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2980b9',
    },
  },
  registerLink: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '0.9rem',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default Login; 