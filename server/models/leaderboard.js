const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS leaderboard (
      leaderboard_id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      score INT NOT NULL,
      position INT NOT NULL,
      achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (leaderboard_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
  `;
  await con.query(sql);
}

async function getLeaderboard() {
  let sql = `SELECT * FROM leaderboard`;
  return con.query(sql);
}

async function changeScore(leaderboard) {
  let sql = `UPDATE leaderboard SET score = ? WHERE leaderboard_id = ?`;
  return con.query(sql, [leaderboard.score, leaderboard.leaderboard_id]);
}

async function deleteLeaderboard(leaderboard) {
  let sql = `DELETE FROM leaderboard WHERE leaderboard_id = ?`;
  return con.query(sql, [leaderboard.leaderboard_id]);
}

module.exports = { createTable, getLeaderboard, changeScore, deleteLeaderboard };