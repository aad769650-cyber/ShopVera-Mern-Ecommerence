// const mysql=require("mysql2/promise")
// require('dotenv').config();


// const fs=require("fs")

// const pool=mysql.createPool({
//     host:process.env.HOST,
//     database:process.env.DB,
//     port:process.env.sqlPort,
//     password:process.env.PASSWORD,
//     user:process.env.USER,
//     ssl:{
//       // ca:fs.readFileSync(process.env.CA),
//        rejectUnauthorized: false
//     },
//      waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// })

// module.exports={pool}



"locally"
const mysql=require("mysql2/promise")


const fs=require("fs")

const pool=mysql.createPool({
    host:"localHost",
    database:"ShopVera",
    password:"SunnySky42!",

    port:3306,
    user:"root",
  
})

module.exports={pool}