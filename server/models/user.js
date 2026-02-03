const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(20) NOT NULL UNIQUE,
      highscore INT NOT NULL DEFAULT 0,
      password VARCHAR(20) NOT NULL,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY(user_id)
    );
  `;
  await con.query(sql);
}

async function userExists(username) {
  let sql = `SELECT * FROM users WHERE username = ?;`;
  let result = await con.query(sql, [username]);
  return result;
}

async function getUsers() {
  let sql = `SELECT * FROM users;`;
  return await con.query(sql);
}

async function login(user) {
  let cUser = await userExists(user.username);
  if (!cUser[0]) throw Error("Username does not exist!");
  if (cUser[0].password !== user.password) throw Error("Password is incorrect");
  return cUser[0];
}

async function register(user) {
  let u = await userExists(user.username);

  if (u.length > 0) throw Error("Username already exists");

  let sql = `INSERT INTO users (username, password, name) 
  VALUES ("${user.username}","${user.password}","${user.name}");`;

  await con.query(sql);
  
  let newUser = await userExists(user.username);

  return newUser[0];
}

async function deleteUser(user) {
  let sql = `DELETE FROM users WHERE username = ?;`;
  return await con.query(sql, [user.username]);
}

async function editUser(user) {
  const sql = `UPDATE users SET username = ? WHERE user_id = ?;`;
  await con.query(sql, [user.username, user.user_id]);
  const newUser = await getUser(user);
  return newUser[0];
}

async function editPassword(user) {
  const sql = `UPDATE users SET password = ? WHERE user_id = ?;`;
  return await con.query(sql, [user.password, user.user_id]);
}

async function getUser(user) {
  const sql = `SELECT * FROM users WHERE user_id = ?;`;
  return await con.query(sql, [user.user_id]);
}

module.exports = {
  login,
  register,
  userExists,
  deleteUser,
  createTable,
  getUsers,
  editUser,
  editPassword,
  getUser
};