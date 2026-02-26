import axios from "axios"
import { Navigate } from "react-router";
import { toast } from "sonner";


export const api=axios.create({
    baseURL:"http://localhost:8000",

})



export const fetchDetail=async(params)=>{

try {
    const data=await api.get(`/detail/${params.id}/${params.category}`);
    console.log(data,"data");
    
    return data;
    
} catch (error) {
    console.log("err",err);
    
}


}

export const fetchData=async()=>{
try {
     return await api.get("/data").then((res)=>{
  return res;
})
    
} catch (error) {
    console.log("err",err);
    
}

      






}



export const Register=async(formData)=>{

try {
    console.log("working...");


    const data=await api.post("/user/register",formData,{withCredentials:true})
console.log(data);
return data;
} catch (error) {
    console.log(err,"err");
    
}

    
}

export const loginUser=async(formData)=>{

try {
    console.log("working...");


    const data=await api.post("/user/login",formData,{withCredentials:true})
console.log(data);

if(data){
    <Navigate to={"/cart"}></Navigate>
    toast.success("You are successfully Logged in")
}


return data;
} catch (error) {
    if (error.response) {
      // Server responded with 4xx/5xx
      console.log("Status:", error.response.status);      // 401
      console.log("Message:", error.response.data);
      toast.error(error.response.data.msg) // "Unauthorized: Invalid token"
    } 
    else if (error.request) {
      // Request made but no response
      console.log("No response received");
    } 
    else {
      // Something else
      console.log("Error:", error.message);
    }    
}

    
}


