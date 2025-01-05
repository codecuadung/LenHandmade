import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../Screens/Home/HomeScreen';
import PersonnalScreen from '../Screens/Personal/PersonnalScreen';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Personnal') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size || 28} color={color || 'white'} />;
        },
        tabBarActiveTintColor: 'white', // Màu chữ khi tab được chọn
        tabBarInactiveTintColor: '#ffe0d6', // Màu chữ khi tab không được chọn
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Trang Chủ' }} 
      />
      <Tab.Screen 
        name="Personnal" 
        component={PersonnalScreen} 
        options={{ title: 'Cá Nhân' }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#00A65E', // Nền màu cam
    height: 60,
    borderRadius:30,
    elevation: 5,
    position: 'absolute',
    marginBottom:20,
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%'
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
});
