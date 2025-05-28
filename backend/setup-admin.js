const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function setupAdmin() {
  let connection;
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'onlinenewspaper'
    });
    console.log('Connected to database');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Delete existing admin if exists
    await connection.query('DELETE FROM users WHERE username = ?', ['admin']);
    console.log('Deleted existing admin if any');

    // Insert new admin
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    await connection.query(query, ['admin', hashedPassword, 'admin']);
    console.log('Admin user created successfully');

    // Close connection
    await connection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    if (connection) {
      await connection.end();
    }
  }
}

setupAdmin(); 