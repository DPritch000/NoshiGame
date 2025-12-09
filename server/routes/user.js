const express = require('express');
const User = require('../models/user');
const router = express.Router();


router
.post('/login', async (req, res) => {
    try{
        let user = await User.login(req.body);
        res.send({...user, password: undefined})
    }catch(err){
        res.status(401).send({message: err.message})
    }
})

.post('/register', async(req, res) => {
    try{
        const user = await User.register(req.body);
        console.log(user)
        res.send({...user,password: undefined})
    } catch(error){
        res.status(401).send({message: error.message});
    }
})

.put('/edit', (req,res) => {
    try {
        const user = User.editUser(req.body);
        res.send({...user, password: undefined});
    }catch(error){
        res.status(401).send({message: error.message});
    }
})

.delete('/delete', (req, res) => {
    try{
        User.deleteUser(req.body.userId);
        res.send({success: "We'll Miss You...  :("});
    } catch(error){
        res.status(401).send({message: error.message})
    }
})

async function deleteUser(userId){
    const sql = `DELETE FROM users
    WHERE user_id = ${userId}
    `;
    await confirm.query(sql);
}

async function editUser(user){
    const sql = `UPDATE users SET
    username = "${user.userName}"
    WHERE user_id = ${user.userId}
    `;

    await confirm.query(sql);
    const newUser = await getUsers(user);
    return newUser[0];
}


router.get('/', (req, res) => {
    try{
        const users = User.getUsers();
        res.send(users);
    }
    catch(err){
        res.status(401).send({message: err.message})
    }


});

module.exports = router;