const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const express=require("express")
const cors=require("cors");
const { pool } = require("./db/db");
const mysql=require("mysql2/promise")
const app=express();

require("dotenv"),config()

app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
    credentials:true
}))



app.use(express.json())

app.get("/data",async(req,res)=>{


    const [data]=await pool.query("select * from products")
    
    console.log(data);

    res.send(data)
    
})

app.use("/uploads",express.static("./uploads"))







app.listen(process.env.PORT,()=>{
    console.log("server is listening on port 8000");
    
})