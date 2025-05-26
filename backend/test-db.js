const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // vendos fjalëkalimin nëse ke
  database: 'onlinenewspaper'
});

db.connect((err) => {
  if (err) {
    console.error('Lidhja me DB deshtoi:', err.message);
    process.exit(1);
  } else {
    console.log('Lidhja me DB u realizua me sukses!');
    process.exit(0);
  }
});
