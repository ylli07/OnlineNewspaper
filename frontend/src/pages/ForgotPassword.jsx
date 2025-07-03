import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItems from '../components/NavItems';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    // This is a placeholder. You'll need to implement the backend logic for this.
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset request for:', email);
      setMessage('If an account with that email exists, a password reset link has been sent.');
    } catch (err) {
      setError('Could not connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

      {/* Forgot Password Form */}
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Forgot Your Password?</h2>
          <p style={styles.subtitle}>Enter your email to receive a reset link</p>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            {message && <div style={styles.message}>{message}</div>}
            {error && <div style={styles.error}>{error}</div>}
            
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="submit" style={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div style={styles.registerLink}>
              Remembered your password?{' '}
              <Link to="/login" style={styles.link}>
                Sign In
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
  },
  submitButton: {
    padding: '1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2980b9',
    },
    '&:disabled': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    },
  },
  registerLink: {
    textAlign: 'center',
    color: '#7f8c8d',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.8rem',
    borderRadius: '5px',
    textAlign: 'center',
  },
  message: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '0.8rem',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default ForgotPassword; 