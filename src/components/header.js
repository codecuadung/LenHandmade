import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }) => {
    const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row', // Sắp xếp các phần tử theo chiều ngang
    alignItems: 'center', // Căn giữa theo trục dọc
    paddingHorizontal: 16,
    backgroundColor: '#FF714B',
    justifyContent: 'center', // Đặt nội dung ở giữa
    marginTop:10
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  back: {
    position: 'absolute', // Đặt nút quay lại bên trái
    left: 16, // Cách lề trái
  },
})
