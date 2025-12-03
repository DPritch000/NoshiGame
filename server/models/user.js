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
        password:"reallPassword"
    }
];

let getUsers = () => users;




async function login(user) {
    let sql = `
    SELECT * FROM User
    WHERE Username =${user.username}
    `
    return await con.query(sql)
}
//Need to export to allow access
module.exports = {getUsers, login};