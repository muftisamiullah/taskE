// const mysql = require('mysql');
// const dotenv = require('dotenv');

// dotenv.config();
// // Configuring mysql connection
// const connection = mysql.createConnection({
//     host: process.env.host,
//     user: process.env.user,
//     password: process.env.password,
//     database: process.env.database,
// });

// // connect to the mysql database
// connection.connect((err) => {
//     if (!err) {
//         console.log("database connected");
//     } else {
//         console.log(err);
//     }
// });

// module.exports = connection;

var Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const connection = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});


module.exports = connection