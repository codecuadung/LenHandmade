import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../Screens/Home/HomeScreen';
import PersonnalScreen from '../Screens/Personal/PersonnalScreen';
import DesignScreen from '../Screens/bouquetDesign/DesignScreen';
import NotificationScreen from '../Screens/notification/NotificationScreen';
import ChatScreen from '../Screens/chat/ChatScreen';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconSize = focused ? 35 : 30; // Kích thước thay đổi khi tab được chọn

          if (route.name === 'Home') {
            return <Icon name="home" size={iconSize} color={'white'} />;
          } else if (route.name === 'Design') {
            return (
              <Image
                style={{
                  width: iconSize,
                  height: iconSize,
                }}
                source={require('../assets/flower.png')} 
                resizeMode="contain"
              />
            )
          }else if (route.name === 'Chat') {
            return (
              <Image
                style={{
                  width: iconSize,
                  height: iconSize,
                }}
                source={require('../assets/chat.png')} 
                resizeMode="contain"
              />
            )
          }else if (route.name === 'Notification') {
            return <Icon name="notifications" size={iconSize} color={'white'} />;
          }else if (route.name === 'Personnal') {
            return <Icon name="person" size={iconSize} color={'white'} />;
          }
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ffe0d6',
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Trang Chủ' }} />
      <Tab.Screen name="Design" component={DesignScreen} options={{ title: 'Thiết kế' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Nhắn tin' }} />
      <Tab.Screen name="Notification" component={NotificationScreen} options={{ title: 'Thông báo' }} />
      <Tab.Screen name="Personnal" component={PersonnalScreen} options={{ title: 'Cá Nhân' }} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#00A65E',
    height: 60,
    borderRadius: 30,
    elevation: 5,
    position: 'absolute',
    marginBottom: 20,
    width: '94%',
    marginLeft: '3%',
    marginRight: '2%',
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
});
