import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderHome= () => {
  const cartItemCount = 3
  return (
    <View style={styles.headerStyle}>
      <View style={{}}>
        <Text style={{textAlign:'center',fontWeight:'bold'}}>Hoa len</Text>
        <Text style={{color:'#FF714B',fontSize:20,fontWeight:'bold'}}>Handmade</Text>
      </View>
      <View style={styles.headerRight}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.cartButton}>
          <Icon name="shopping-cart" size={28} color="#FF714B" />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#FFFFFF', // Nền màu cam của header
    height: 80, // Chiều cao header
    flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between', // Đảm bảo phần tử bên trái và phải được căn đều
    marginTop:10
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Nền trắng với độ trong suốt
    borderRadius: 15,
    height: 40,
    width: '70%',
    paddingLeft: 10,
    marginRight: 10,
    borderColor:'#FF714B',
    borderWidth:2
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HeaderHome;
