import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '../../utils/ThemeContext';
import { darkTheme, lightTheme } from '../../utils/Theme';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? darkTheme.colors.text : lightTheme.colors.text;
  const background = isDarkMode? darkTheme.colors.background : lightTheme.colors.background
  const divider = isDarkMode? lightTheme.colors.background : darkTheme.colors.background

  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={0}
      style={{ flex: 1}}
    >
      <View style={[styles.container,{backgroundColor:background}]}>
        <Image
          style={styles.logo}
          source={require('../../assets/iconBanner.png')}
        />
        <Text style={[styles.title,{color:textColor}]}>Đăng ký</Text>

        <TextInput
          style={[styles.input]}
          placeholder="Nhập email"
        />
        <TextInput
          style={[styles.input]}
          placeholder="Nhập họ tên"
        />
        <TextInput
          style={[styles.input]}
          placeholder="Nhập số điện thoại"
        />
        <TextInput
          style={[styles.input]}
          placeholder="Nhập mật khẩu"
          secureTextEntry
        />
         <TextInput
          style={[styles.input]}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
        />

        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText]}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider,{backgroundColor:divider}]} />
          <Text style={textColor}>or</Text>
          <View style={[styles.divider,{backgroundColor:divider}]} />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, {color:textColor}]}>
            Bạn đã có tài khoản?
          </Text>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
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
