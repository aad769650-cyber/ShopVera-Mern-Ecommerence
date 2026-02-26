import { createSlice } from "@reduxjs/toolkit";
const initialState=JSON.parse(localStorage.getItem("cart"))||[]
const IncrementReducer=createSlice({
    name:"counter",
    initialState,
    reducers:{
       AddToCart:(state,action)=>{
        console.log("reducer",state,action.payload,initialState);
        


// initialState



       state.push(action.payload)
localStorage.setItem("cart",JSON.stringify(state))
       },

       RemoveToCart:(state,action)=>{
        console.log(state,action);
        localStorage.setItem("cart",JSON.stringify(state.filter((curr)=>curr.id!==action.payload.id)))

    return state.filter((curr)=>curr.id!==action.payload.id)
   
    
    },
      




    }
})



export const {AddToCart,RemoveToCart,}=IncrementReducer.actions;

export default IncrementReducer.reducer