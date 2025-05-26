const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // ose fjalëkalimi yt
  database: 'onlinenewspaper'
});

db.connect((err) => {
  if (err) {
    console.error('Lidhja me DB deshtoi:', err);
  } else {
    console.log('Lidhja me DB u realizua me sukses!');
  }
});

module.exports = db;
