const { pool } = require("./db_connect"); // use the fixed db_connect with .promise()

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS leaderboard (
      leaderboard_id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      score INT NOT NULL,
      position INT NOT NULL DEFAULT 0,
      achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (leaderboard_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
  `;
  await pool.query(sql);
}

async function getHighScore(user_id) {
  const sql = `SELECT MAX(score) as highScore FROM leaderboard WHERE user_id = ?`;
  const [rows] = await pool.query(sql, [user_id]);
  return rows[0]?.highScore || 0;
}

async function leaderboardEntry(user_id, score) {
  const floorScore = Math.floor(score);
  
  // Get user's current high score
  const currentHighScore = await getHighScore(user_id);
  
  // Only insert if the new score is higher than the previous high score
  if (floorScore > currentHighScore) {
    const sql = `INSERT INTO leaderboard (user_id, score) VALUES (?, ?)`;
    const [result] = await pool.query(sql, [user_id, floorScore]);
    return { ...result, newHighScore: true };
  } else {
    return { newHighScore: false, message: "Score did not beat high score" };
  }
}

async function getLeaderboard() {
  const sql = `
    SELECT u.username, l.score
    FROM leaderboard l
    JOIN users u ON l.user_id = u.user_id
    ORDER BY l.score DESC
    LIMIT 50
  `;
  const [rows] = await pool.query(sql); // <-- destructure the rows
  return rows; // return the array directly
}

async function changeScore(leaderboard) {
  const sql = `UPDATE leaderboard SET score = ? WHERE leaderboard_id = ?`;
  const [result] = await pool.query(sql, [leaderboard.score, leaderboard.leaderboard_id]);
  return result;
}

async function deleteLeaderboard(leaderboard_id) {
  const sql = `DELETE FROM leaderboard WHERE leaderboard_id = ?`;
  const [result] = await pool.query(sql, [leaderboard_id]);
  return result;
}

module.exports = { createTable, getLeaderboard, changeScore, deleteLeaderboard, leaderboardEntry, getHighScore };
