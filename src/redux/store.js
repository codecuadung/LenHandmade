import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice'
import userReducer from'./slices/userSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    user: userReducer
  },
});

export default store;
