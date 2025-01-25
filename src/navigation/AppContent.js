import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'; // Import StatusBar

import HomeScreen from '../Screens/Home/HomeScreen';
import SplashScreen from '../Screens/Welcome/SplashScreen';
import LoginScreen from '../Screens/Login/LoginScreen';
import RegisterScreen from '../Screens/Register/RegisterScreen';
import BottomTab from './BottomTab';
import ProductDetail from '../Screens/Detail/ProductDetail';
import DesignScreen from '../Screens/bouquetDesign/DesignScreen';
import NotificationScreen from '../Screens/notification/NotificationScreen';
import ChatScreen from '../Screens/chat/ChatScreen';

import { darkTheme, lightTheme } from '../utils/Theme';
import { useTheme } from '../utils/ThemeContext';
import Category from '../Screens/Home/Category';
import CategoryScreen from '../Screens/Category/CategoryScreen';

const AppContent = () => {
  const Stack = createStackNavigator();
  
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Cập nhật StatusBar khi isDarkMode thay đổi
  useEffect(() => {
    // Cập nhật trạng thái StatusBar
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isDarkMode ? darkTheme.colors.background : lightTheme.colors.background);
  }, [isDarkMode]); // Khi isDarkMode thay đổi, cập nhật StatusBar

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name='Detail' component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name='Design' component={DesignScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Notification' component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Chat' component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Category' component={Category} options={{ headerShown: false }} />
        <Stack.Screen name='CategoryScreen' component={CategoryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContent;
