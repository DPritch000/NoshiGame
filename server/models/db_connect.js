require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || process.env.MYSQLHOST,
  user: process.env.MYSQL_USERNAME || process.env.MYSQLUSER,
  password: process.env.MYSQL_PSWD || process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DB || process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // <--- important for async/await

// wrapper function
const query = async (sql, binding = []) => {
  try {
    const [rows, fields] = await pool.query(sql, binding);
    return rows;
  } catch (err) {
    console.error('Database query error: ', err);
    console.error('Failed SQL:', sql);
    console.error('Bindings:', binding);
    // Attach SQL info to error for easier debugging upstream
    err.query = sql;
    err.bindings = binding;
    throw err;
  }
};

module.exports = { pool, query };
