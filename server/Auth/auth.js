require("dotenv").config()
const jwt=require("jsonwebtoken")


 const generateAccessToken=(body)=>{
    console.log(body);
const payload={
    name:body?.username,
    email:body?.email
}
    return  jwt.sign(payload,process.env.AccessToken)


    
}


 const generateRefreshToken=(body)=>{
    console.log("body",body.username);
const payload={
    name:body?.username,
    email:body?.email
}
    return  jwt.sign(payload,process.env.AccessToken)


    
}

module.exports={generateAccessToken,generateRefreshToken}



