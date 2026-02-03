require('dotenv').config();
const mysql = require('mysql2');

// Support either a single connection string (Railway-style) or individual env vars.
const connectionString = process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.CLEARDB_DATABASE_URL;

let pool;
if (connectionString) {
  pool = mysql.createPool(connectionString).promise();
  // Log non-sensitive resolved info for debugging
  try {
    const url = new URL(connectionString);
    console.log('DB pool using connection string -> host:', url.hostname, 'port:', url.port || 3306, 'database:', url.pathname.replace(/^\//, ''), 'user:', url.username ? url.username.replace(/.(?=...)/g, '*') : undefined);
  } catch (e) {
    console.log('DB pool using connection string (unable to parse for masked log).');
  }
} else {
  const dbConfig = {
    host: process.env.MYSQL_HOST || process.env.MYSQLHOST,
    user: process.env.MYSQL_USERNAME || process.env.MYSQLUSER,
    password: process.env.MYSQL_PSWD || process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DB || process.env.MYSQLDATABASE,
    port: process.env.MYSQL_PORT || process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
  pool = mysql.createPool(dbConfig).promise(); // <--- important for async/await
  // Log masked config for debugging
  console.log('DB pool config -> host:', dbConfig.host, 'port:', dbConfig.port, 'database:', dbConfig.database, 'user:', dbConfig.user ? dbConfig.user.replace(/.(?=...)/g, '*') : undefined);
}

// wrapper function
const query = async (sql, binding = []) => {
  try {
    const [rows, fields] = await pool.query(sql, binding);
    return rows;
  } catch (err) {
    console.error('Database query error: ', err);
    console.error('Failed SQL:', sql);
    console.error('Bindings:', binding);
    // log known mysql fields if available
    console.error('Error code:', err.code, 'errno:', err.errno, 'sqlMessage:', err.sqlMessage, 'sqlState:', err.sqlState, 'fatal:', err.fatal);
    console.error('Error keys:', Object.getOwnPropertyNames(err));
    // Attach SQL and MySQL-specific info to error for easier debugging upstream
    err.query = sql;
    err.bindings = binding;
    err.mysql = {
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      fatal: err.fatal
    };
    throw err;
  }
};

module.exports = { pool, query };
