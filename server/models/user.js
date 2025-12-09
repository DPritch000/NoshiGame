const con = require("./db_connect");

async function createTable(){
    let sql =  `CREATE TABLE IF NOT EXISTS users(
    Userid INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(20) NOT NULL UNIQUE,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(20) NOT NULL UNIQUE
    
    )`
    await con.query(sql)
}

const users = [
    {
        userID: 12345,
        userNamer: "someUser",
        password:"realPassword"
    }
];

let getUsers = () => users;

async function userExists(username){
    let sql =` 
        SELECT * FROM users
        WHERE userName = "${userName}" `
        
        return await con.query(sql);
        let u = await con.query(sql);
        return u;
}


async function login(user) {
    let cUser = await userExists(user.username);
    if(!cuser[0]) throw Error("Username does not exist!" );
    if(cUser[0].password != user.password) throw Error("Password is incorrect");
    
    return cUser[0];
}
async function register(user){
    const u = userExists(user.username);
    if(u.length>0) throw Error('Username already exists')

    const sql = `INSERT INTO users (username, user_password)
    VALUES ("${user.username}", "${user.password}")`;
await con.query(sql);
const newUser = await getUsers(user);
return newUser[0];
}
//Need to export to allow access
module.exports = {getUsers, login};