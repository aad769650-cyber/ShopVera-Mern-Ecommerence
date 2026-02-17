import { configureStore } from "@reduxjs/toolkit";
import IncrementReducer from "../slice/slice"
export const store=configureStore({

    reducer:{IncrementReducer}
})