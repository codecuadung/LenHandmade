import { createSlice } from "@reduxjs/toolkit";
import { userThunk } from "../thunks/userThunk";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        item:[],
        loading:false,
        error:null,
    },
    reducers:{

    },
    extraReducers:(buidler)=>{
        buidler
        .addCase(userThunk.pending,(state)=>{
            state.loading = true
        })
        .addCase(userThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.item.push(action.payload);
        })
        .addCase(userThunk.rejected,(action,state)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default userSlice.reducer