import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Reducers/UserReducer";

export const store = configureStore({
    reducer : {
        app : userSlice.reducer
    }
})