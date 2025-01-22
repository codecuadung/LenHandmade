import { StyleSheet, Text, View, TextInput,Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderHome from '../../components/HeaderHome';
import ImagePickerComponent from './ImagePickerComponent';
import FilePickerComponent from './FilePickerComponent';
import EncryptedStorage from 'react-native-encrypted-storage';

const DesignScreen = () => {
  const [name, setName] = useState('');
  const [quantity,setQuantity] = useState('1')

  const getEncryptedStorage = async () => {
    try {
      const credentials = await EncryptedStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        const email = parsedCredentials.email;
        return email;
      } else {
        console.log("No credentials found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching encrypted storage:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getEncryptedStorage();
    };
    fetchData();
  }, []);


  const handleSub = ()=>{
  if(parseInt(quantity)===1){
  return
  }else{
  setQuantity()
  }}

  const handlePlus = ()=>{

  }

  return (
    <View style={{flex:1}}>
      <HeaderHome />
      <View style={styles.container}>
      <Text style={styles.headerText}>Đan móc len theo yêu cầu</Text>
      <ImagePickerComponent />
      <Text>Chọn tệp Char móc len(nếu có)</Text>
      <FilePickerComponent />
      <TextInput
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      {/* mô tả */}
      <TextInput
      style={styles.input}
      multiline={true}
      placeholder='Mổ tả'/>
      {/* số lượng */}
      <View style={{flexDirection:'row'}}>
        <Image style={{width:30,height:30}} source={require('../../assets/tru.png')}/>
        <TextInput
        value={quantity}
        onChangeText={(text)=>setQuantity(text)}/>
        <Image style={{width:30,height:30}} source={require('../../assets/cong.png')}/>
      </View>
      </View>
    </View>
  );
};

export default DesignScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight:16,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF714B',
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});
