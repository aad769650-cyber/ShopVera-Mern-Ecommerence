const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const express=require("express")
const cors=require("cors");
const { pool } = require("./db/db");
const mysql=require("mysql2/promise");
const { userRouter } = require("./routes/userRoute");
const app=express();
const nodemailer=require("nodemailer")
const path=require("path")
require("dotenv").config()

app.use(cookieParser());
app.use("/uploads",express.static("./uploads"))

const allowedOrigins = [
  "https://shopvera-mern-ecommerence.onrender.com", // frontend deployed URL
  "http://localhost:5173",  // dev
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.includes(origin)) return callback(null, true); // allow frontend
    return callback(new Error("CORS not allowed"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true // required for cookies/auth
}));

app.use(express.json())

app.get("/data",async(req,res)=>{

console.log("received");

   try {
     const [data]=await pool.query("select * from products")
    
    console.log(data[0]);

   return  res.status(200).send(data)
   } catch (error) {
            console.error("🔥 Query exploded:", error.message);
        return res.status(400).json({ 
            msg: "Database rejected the request", 
            error: error.message 
        });
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



const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
         user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    }
})




app.post("/sendMail", async (req, res) => {
  const { checkInDate, checkOutDate, guests } = req.body.data;

  const mailConfig = {
    from: "aad769650@gmail.com",
    to: "aad769650@gmail.com",
    subject: `New Booking – ${guests} guest(s)`,
    text: `
New Booking Details

Check-in Date: ${checkInDate}
Check-out Date: ${checkOutDate}
Number of Guests: ${guests}
    `,
  };

  try {
    await transport.sendMail(mailConfig);
    console.log("Email sent");

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (err) {
    console.error("Email error:", err.code || err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});
















const PORT=Number(process.env.PORT)||8000
app.listen(PORT,()=>{
    console.log("server is listening on port 8000",typeof(process.env.PORT));
    
})