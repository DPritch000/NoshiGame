// specify we want to use express
const express = require('express')
const path = require("path")
const app = express()

app.use(express.json())




//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use(express.static(__dirname + "/public"))

const userRoutes = require("./server/routes/user.js")
app.use('/', userRoutes);

const leaderboardRoutes = require("./server/routes/leaderboard.js");
app.use("/lb", leaderboardRoutes);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/login.html')))

// Import model functions for table creation
const userModel = require("./server/models/user.js");
const leaderboardModel = require("./server/models/leaderboard.js");

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!!`)
  
  // Create tables after server starts
  setTimeout(async () => {
    try {
      await userModel.createTable();
      console.log("User table created/verified");
    } catch (err) {
      console.error("Error creating user table:", err.message);
    }
    
    try {
      await leaderboardModel.createTable();
      console.log("Leaderboard table created/verified");
    } catch (err) {
      console.error("Error creating leaderboard table:", err.message);
    }
  }, 2000);
})
