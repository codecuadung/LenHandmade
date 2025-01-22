import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState,useEffect } from 'react';
// import Checkbox from 'react-native-checkbox';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '../../utils/ThemeContext';
import { darkTheme, lightTheme } from '../../utils/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/thunks/authThunk';
import { resendVerificationEmail } from '../../redux/thunks/authThunk';
import EncryptedStorage from 'react-native-encrypted-storage';
const LoginScreen = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? darkTheme.colors.text : lightTheme.colors.text;
  const background = isDarkMode
    ? darkTheme.colors.background
    : lightTheme.colors.background;
  const divider = isDarkMode
    ? lightTheme.colors.background
    : darkTheme.colors.background;

  const passwordExisted = route.params?.password || ''
  const emailExisted = route.params?.email|| ''
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState(emailExisted);
  const [password, setPassword] = useState(passwordExisted);

  const dispatch = useDispatch();
  const { loading,error } = useSelector((state) => state.auth);



  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
  
    try {
      await dispatch(loginThunk({ email, password })).unwrap();
  
      // Nếu checkbox được chọn, lưu thông tin đăng nhập
      if (checked) {
        await EncryptedStorage.setItem(
          'userCredentials',
          JSON.stringify({ email, password })
        );
        console.log('Thông tin đăng nhập đã được lưu.');
      } else {
        // Nếu checkbox không được chọn, xóa thông tin đã lưu trước đó
        await EncryptedStorage.removeItem('userCredentials');
        console.log('Đã xóa thông tin đăng nhập.');
      }
  
      navigation.navigate('BottomTab');
    } catch (error) {
      Alert.alert('Đăng nhập thất bại', error); // Hiển thị thông báo lỗi từ rejectWithValue
    }
  };
  
  const handleReSendEmail = async()=>{
    await dispatch(resendVerificationEmail())
  }
  
//hàm lấy email và password đã lưu 
const getSavedCredentials = async () => {
  try {
    const credentials = await EncryptedStorage.getItem('userCredentials');
    if (credentials) {
      return JSON.parse(credentials);
    }
    return null; // Không có thông tin lưu trữ
  } catch (error) {
    console.error('Lỗi khi lấy thông tin tài khoản:', error);
    return null;
  }
};

//set tk và mk 
useEffect(() => {
  const fetchSavedCredentials = async () => {
    const savedCredentials = await getSavedCredentials();
    if (savedCredentials) {
      setEmail(savedCredentials.email);
      setPassword(savedCredentials.password);
      setChecked(true); // Đặt trạng thái checkbox thành đã chọn
    }
  };

  fetchSavedCredentials();
}, []);

const handleCheckBoxChange = () => {
  setChecked(!checked); // Đảo trạng thái checkbox khi nhấn
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF714B" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Image style={styles.logo} source={require('../../assets/iconBanner.png')} />
        <Text style={[styles.title, { color: textColor }]}>Đăng nhập</Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập email của bạn"
          placeholderTextColor={divider}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu của bạn"
          placeholderTextColor={divider}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <View style={styles.checkboxContainer}>
          {/* thêm checkbox */}
          {/* <Checkbox
            value={checked}
            onValueChange={handleCheckBoxChange}
          /> */}


          <Text style={[styles.checkboxLabel, { color: textColor }]}>Nhớ</Text>
        </View>

        {error&&
        <TouchableOpacity onPress={handleReSendEmail}>
          <Text>
            Gửi lại mail xác nhận
          </Text>
        </TouchableOpacity>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: divider }]} />
          <Text style={{ color: textColor }}>or</Text>
          <View style={[styles.divider, { backgroundColor: divider }]} />
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Image style={styles.icon} source={require('../../assets/google.png')} />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColor }]}>
            Bạn chưa có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor:'#FF714B'
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    backgroundColor:'#FF714B'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color:'#FFFFFF'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    height: 1,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor:'black'
  },
  iconButton: {
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginRight: 5,
  },
  link: {
    fontWeight: 'bold',
    color:'#FF714B'
  },
});
