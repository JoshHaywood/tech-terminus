const mysql = require('mysql');

//Database setup
const db = mysql.createPool({
    //Local
    // host: 'localhost',
    // user: 'root',
    // password: 'password',
    // database: 'web310_a1'    

    //Deploy
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = db;