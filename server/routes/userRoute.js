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
    // ,{ 
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",


// }
)
res.cookie("Refresh",refreshToken,
// {  
    //    httpOnly: true,
    // secure: true,
    // sameSite: "none"

// }
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
    // ,{ 
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",


// }
)
res.cookie("Refresh",refreshToken,
// {  
    //    httpOnly: true,
    // secure: true,
    // sameSite: "none"

// }
)






     return res.status(200).send("working good")
} catch (error) {
         return res.status(500).json({msg:"something wrong Try Again!"})

}
    
})


module.exports={userRouter}