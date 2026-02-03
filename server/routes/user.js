const express = require('express');
const User = require('../models/user.js'); // make sure user.js exports all needed functions
const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
  try {
    console.log("Login request received:", req.body.username);
    let user = await User.login(req.body);
    console.log("User logged in successfully:", user.username);
    res.send({ ...user, password: undefined });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(401).send({ message: err.message });
  }
});

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    let user = await User.register(req.body);
    console.log("User registered successfully:", user.username);
    res.send({ ...user, password: undefined });
  } catch (error) {
    console.error("Register error:", error);
    const errorMessage = error.message || error.toString();
    // send stack and DB info for debugging; remove in production
    const debugInfo = {
      message: errorMessage,
      stack: error.stack
    };
    if (error.query) debugInfo.query = error.query;
    if (error.bindings) debugInfo.bindings = error.bindings;
    res.status(401).send(debugInfo);
  }
});

// EDIT USER
router.put('/edit', async (req, res) => {
  try {
    const user = await User.editUser(req.body);
    res.send({ ...user, password: undefined });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});
router.put('/changepassword', async (req, res) => {
  try {
    const user = await User.editPassword(req.body);
    res.send({ ...user, password: undefined });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

// DELETE USER
router.delete('/delete', async (req, res) => {
  try {
    await User.deleteUser(req.body.userId);
    res.send({ success: "We'll Miss You... :(" });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

// GET ALL USERS
router.get('/user', async (req, res) => {
  try {
    const users = await User.getUsers();
    res.send(users);
  } catch (err) {
    res.status(401).send({ message: err.message });
    
  }
});

module.exports = router;