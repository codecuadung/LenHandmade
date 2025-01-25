import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '../../utils/ThemeContext';
import { darkTheme, lightTheme } from '../../utils/Theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../redux/thunks/authThunk';
import { userThunk } from '../../redux/thunks/userThunk';

const RegisterScreen = () => {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? darkTheme.colors.text : lightTheme.colors.text;
  const background = isDarkMode ? darkTheme.colors.background : lightTheme.colors.background;
  const divider = isDarkMode ? lightTheme.colors.background : darkTheme.colors.background;

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confimPassword, setConfimPassword] = useState('');

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'#FF714B'} />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Đã có lỗi xảy ra trong quá trình đăng ký</Text>
      </View>
    );
  }

  const handleRegister = async () => {
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      confimPassword.trim() === '' ||
      fullName.trim() === ''
    ) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
  
    if (password !== confimPassword) {
      Alert.alert('Xác nhận mật khẩu không trùng khớp');
      return;
    }
  
    if (password.length < 6 || confimPassword.length < 6) {
      Alert.alert('Mật khẩu phải từ 6 ký tự');
      return;
    }
  
    try {
      const registerResult = await dispatch(registerThunk({ email, password })).unwrap(); // Unwrap để lấy dữ liệu hoặc lỗi
      if (registerResult) {
        await dispatch(userThunk({ email,fullName,role:"user" })).unwrap();
        Alert.alert("Bạn đã đăng ký thành công");
        navigation.navigate('Login', { email, password });
      }
    } catch (error) {
      console.log('Lỗi', error); // Hiển thị lỗi chi tiết
    }
  };
  
  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Image style={styles.logo} source={require('../../assets/iconBanner.png')} />
        <Text style={[styles.title, { color: textColor }]}>Đăng ký</Text>

        <TextInput
          style={[styles.input]}
          placeholder="Nhập email"
          placeholderTextColor={'gray'}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Nhập họ tên"
          placeholderTextColor={'gray'}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Nhập mật khẩu"
          placeholderTextColor={'gray'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor={'gray'}
          secureTextEntry
          onChangeText={(text) => setConfimPassword(text)}
        />

        <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
          <Text style={[styles.buttonText]}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: divider }]} />
          <Text style={textColor}>or</Text>
          <View style={[styles.divider, { backgroundColor: divider }]} />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColor }]}>
            Bạn đã có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Text style={[styles.link]}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    color: 'black',
    borderColor: '#FF714B',
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#FF714B',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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
    backgroundColor: 'black',
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
    color: '#FF714B',
  },
});
