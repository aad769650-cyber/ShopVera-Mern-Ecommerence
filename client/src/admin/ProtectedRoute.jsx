import React from 'react'
import { Navigate, useNavigate } from 'react-router';

const ProtectedRoute = ({children}) => {
const navigate=useNavigate()
    const isAuth=JSON.parse(localStorage.getItem("isAuthenticate"));


console.log(isAuth,"inside");

if(isAuth){
    return children
}else{
    console.log("navigating...");
    
    return <Navigate to={"/adminLogin"} ></Navigate>
}

}

export default ProtectedRoute