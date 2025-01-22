import { createAsyncThunk } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore'

export const userThunk = createAsyncThunk(
    'users/postUser',async({email,fullName,role},{rejectWithValue})=>{
        try {
            await firestore().collection('users').add({
                email: email,
                fullName: fullName,
                role: role
               
            })
        } catch (error) {
            return rejectWithValue(error?.message)
        }
    }
)