import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth"

//đăng ký
export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      //tạo tài khoản
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      //gửi link xác minh về email
      await userCredential.user.sendEmailVerification()
      return { email };
    } catch (error) {
      console.error('Error during registration:', error.code, error.message); // Log lỗi chi tiết hơn
      return rejectWithValue(error?.message || 'Đã xảy ra lỗi trong quá trình đăng ký');
    }
  }
);

//Gửi lại email xác minh
export const resendVerificationEmail = createAsyncThunk(
  'auth,resendVerificationEmail',
  async(_,{rejectWithValue})=>{
    try {
      const user = auth().currentUser

      if(user){
        //gửi lại email
        await user.sendEmailVerification()
        return rejectWithValue("Email xác minh đã được gửi lại. Vui lòng kiểm tra hộp thư!")
      }
    } catch (error) {
      return rejectWithValue(error?.message || "Không thể gửi lại email xác minh.")
    }
  }
)


//đăng nhập
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      // Kiểm tra xem người dùng đã xác minh email chưa
      if (!userCredential.user.emailVerified) {
        // Gửi lại email xác minh
        await userCredential.user.sendEmailVerification();
        return rejectWithValue(
          'Email của bạn chưa được xác minh. Vui lòng kiểm tra hộp thư và xác minh email!'
        );
      }

      const user = userCredential.user;
      return {
        // Trả về dữ liệu cần thiết
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      console.error('Error during login:', error.code, error.message); // Log lỗi chi tiết
      return rejectWithValue(error?.message || 'Đăng nhập thất bại!');
    }
  }
);
