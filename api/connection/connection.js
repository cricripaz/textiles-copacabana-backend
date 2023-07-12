const mysql = require( "mysql2");
const dotEnv = require('dotenv');

dotEnv.config();

const mysqlConnection = mysql.createConnection({
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    host: process.env.MYSQLHOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});



console.log(
        `user : ${process.env.USERDB}
        pwd : ${process.env.PASSWORD}
        host : ${process.env.MYSQLHOST}
        port : ${process.env.PORT}
        database : ${process.env.DATABASE}`
)
mysqlConnection.connect(err => {

    if(err){
        console.log('Error DB :' , err)
    }else{
        console.log('DB Connected')
    }
})


module.exports = mysqlConnection;

