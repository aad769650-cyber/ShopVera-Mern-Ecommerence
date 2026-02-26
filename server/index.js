const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const express=require("express")
const cors=require("cors");
const { pool } = require("./db/db");
const mysql=require("mysql2/promise");
const { userRouter } = require("./routes/userRoute");
const app=express();

require("dotenv").config()

app.use(cookieParser());
app.use("/uploads",express.static("./uploads"))

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
    credentials:true
}))



app.use(express.json())

app.get("/data",async(req,res)=>{

console.log("received");

   try {
     const [data]=await pool.query("select * from products")
    
    console.log(data[0]);

   return  res.status(200).send(data)
   } catch (error) {
    return res.status(404).send({Error:"Something is going wrong"})
   }
    
})


app.get("/detail/:id/:category",async(req,res)=>{
try {
        console.log(req.params);

    const id=req.params.id;
    const category=req.params.category;
    const [data]=await pool.query(`select * from products where id=? AND category=?`,[id,category])
    
    console.log(data[0]);

    res.status(200).send(data)
} catch (error) {
    
    res.status(404).json("Error in Something")
}



    
})


app.use("/user",userRouter)



const PORT=Number(process.env.PORT)||8000
app.listen(PORT,()=>{
    console.log("server is listening on port 8000",typeof(process.env.PORT));
    
})