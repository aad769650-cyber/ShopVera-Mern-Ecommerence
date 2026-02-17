const mysql=require("mysql2/promise")
const pool= mysql.createPool({
        host:"localhost",
        password:"SunnySky42!",
        database:"ShopVera",
        port:"3306",
user:"root"
    });


    



module.exports={pool}