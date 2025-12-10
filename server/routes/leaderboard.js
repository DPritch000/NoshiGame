const express = require('express');
const leaderbaord = require('../models/leaderboard.js'); 
const router = express.Router();

router.get('/leaderboard', async (req, res) => {
  try {
    const leaderbaord = await leaderbaord.getLeaderboard();
    res.send(leaderbaord);
  } catch (err) {
    res.status(401).send({ message: err.message });
    
  }
});

router.delete('/deletelb', async (req, res) => {
  try {
    await leaderbaord.deleteleaderboard(req.body.leaderboard_Id);
    res.send({ success: "Leaderboard Deleted" });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.post('/score', async (req, res) => {
    try {
        const score = await leaderbaord.changeScore(req.body.score);
        res.send(leaderbaord);
    }catch (err){
        res.status(401).send({message: error.message});
    }
})


module.exports = router;