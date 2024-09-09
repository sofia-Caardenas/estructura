const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'CAFSENA'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos CAFSENA');
});

module.exports = connection;
