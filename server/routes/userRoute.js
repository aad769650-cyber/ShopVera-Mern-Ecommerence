const express=require("express");
const multer=require("multer");
const { UploadOnCloudinary } = require("../util/cloudinary");
const userRouter=express.Router();
const path=require("path");
const bcrypt=require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../Auth/auth");
const { pool } = require("../db/db");
const cookieParser = require("cookie-parser");

userRouter.use(cookieParser());

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
 const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);    },
    
    destination:(req,file,cb)=>{

        console.log("multer",file);
        
        cb(null,path.join(__dirname, "../uploads"))
    }
})

const upload=multer({storage})


userRouter.post("/register",upload.single("profileImage"),async (req,res)=>{


    console.log(req.body,req.file,"received");

try {
    
                let profileImg = null;
console.log(req.file,"Listings");

      // If user uploaded image
      if (req.file) {
        console.log("Inside ");
        
        profileImg = await UploadOnCloudinary(req.file.path);
      }


const hashedPassword=await bcrypt.hash(req?.body?.password,10)

console.log("after",profileImg,hashedPassword,req.body.email,req.body.username);

const accessToken=generateAccessToken(req.body)
const refreshToken=generateRefreshToken(req.body);


console.log("token",refreshToken);

res.cookie("accessToken",accessToken
    ,{ 
    httpOnly: true,
    secure: true,
    sameSite: "none",


}
)
res.cookie("Refresh",refreshToken,
{  
       httpOnly: true,
    secure: true,
    sameSite: "none"

}
)


const data=await pool.execute(`insert into users(username,password_hash,email,profile_image_url) values (?,?,?,?)`,[
  req?.body?.username,hashedPassword,req?.body?.email,profileImg,
])

console.log(data);


     return res.status(200).send("working good")
} catch (error) {
         return res.status(404).json({msg:"working good"})

}
    
})




userRouter.post("/login",async (req,res)=>{


    console.log(typeof(req.body.email),req.body.email,"received");

try {
console.log("inside");

    const [rows]=await pool.query(`select * from users where email = ?`,[req?.body?.email])
   
   console.log("pass 1");

    if (rows.length === 0) {
      return res.status(401).json({ msg: "Wrong Email " });
    }

    const user = rows[0];
     console.log("pass 2",user);
    const verify=await bcrypt.compare(req?.body?.password,user.password_hash)
    console.log("rows",rows,verify);
     console.log("pass 3");
if(!verify)return res.status(401).json({msg:"Wrong password"})

const accessToken=generateAccessToken(req.body)
const refreshToken=generateRefreshToken(req.body);


console.log("token",refreshToken);

res.cookie("accessToken",accessToken
    ,{ 
    httpOnly: true,
    secure: true,
    sameSite: "none",


}
)
res.cookie("Refresh",refreshToken,
{  
       httpOnly: true,
    secure: true,
    sameSite: "none"

}
)






     return res.status(200).send("working good")
} catch (error) {
         return res.status(500).json({msg:"something wrong Try Again!"})

}
    
})


userRouter.get("/products",async (req,res)=>{


    // console.log("received");

try {

    const [rows]=await pool.query(`select * from products` )
   
//    console.log("pass 1");


 







     return res.status(200).send(rows)
} catch (error) {
         return res.status(500).json({msg:"something wrong Try Again!"})

}
    
})
userRouter.get("/registeredUser",async (req,res)=>{


    console.log("received user");

try {

    const [rows]=await pool.query(`select * from users` )
   
   console.log("pass user",rows);


 







     return res.status(200).send(rows)
} catch (error) {
         return res.status(500).json({msg:"something wrong Try Again!"})

}
    
})












userRouter.post("/registerProduct", upload.single("productImage"), async (req, res) => {
    try {
        let profileImg = null;
        if (req.file) {
            // Wait for the upload to finish and get the URL
            const uploadResult = await UploadOnCloudinary(req.file.path);
            profileImg = uploadResult.secure_url || uploadResult; 
        }

        let { username, desc, category, rating, price } = req.body;
        const hostId = 1;
        const quantity = 1; // Keep as number

        // Data Cleanup Crew 🧹
        const cleanRating = parseFloat(rating) || 0;
        const cleanPrice = parseFloat(price) || 0;

        // THE MAGIC PART: Use '?' placeholders
        const sqlQuery = `
            INSERT INTO products 
            (name, category, pic_url, rating, price, quantity, description, host_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Pass the variables in an array in the EXACT same order as the columns above
        const values = [
            username,    // name
            category,    // category
            profileImg,  // pic_url
            cleanRating, // rating
            cleanPrice,  // price
            quantity,    // quantity
            desc,        // description
            hostId       // host_id
        ];

        const [result] = await pool.query(sqlQuery, values);

        res.status(201).json({
            message: "Product added successfully! 🚀",
            productId: result.insertId
        });

    } catch (error) {
        console.error("🔥 Query exploded:", error.message);
        return res.status(400).json({ 
            msg: "Database rejected the request", 
            error: error.message 
        });
    }
});






userRouter.delete("/deleteProduct", async (req, res) => {
    try {
      
console.log(req.body,'ok');

      const id=req.body.id
        // THE MAGIC PART: Use '?' placeholders
    const sql = 'DELETE FROM products WHERE id = ?';

        // Pass the variables in an array in the EXACT same order as the columns above
     

        const result = await pool.query(`DELETE FROM products WHERE id = ?`, [id]);
console.log(result);

        res.status(201).json({
            message: "Product deleted successfully! 🚀",
            productId: result.id
        });

    } catch (error) {
        console.error("🔥 Query exploded:", error.message);
        return res.status(400).json({ 
            msg: "Database rejected the request", 
            error: error.message 
        });
    }
});










userRouter.patch("/updateProduct", async (req, res) => {
    try {
      
console.log(req.body,'ok');

      const data=req.body.product

      console.log(data);
      
        // THE MAGIC PART: Use '?' placeholders
    const sql = 'update FROM products set name=?,category=?,price=? WHERE id = ?';

        // Pass the variables in an array in the EXACT same order as the columns above
     

        const result = await pool.query('update  products set name=?,category=?,price=? WHERE id = ?', [data.name,data.category,data.price,data.id]);
// console.log(result);

        res.status(201).json({
            message: "Product deleted successfully! 🚀",
            // productId: result.id
        });

    } catch (error) {
        console.error("🔥 Query exploded:", error.message);
        return res.status(400).json({ 
            msg: "Database rejected the request", 
            error: error.message 
        });
    }
});


module.exports={userRouter}