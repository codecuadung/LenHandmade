import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemPersonnal from './ItemPersonnal'
import { launchImageLibrary } from 'react-native-image-picker'; // Import hàm chọn ảnh từ thư viện
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '@env';

const PersonnalScreen = () => {
  const lenght = 5

  // const data = new FormData()
  // data.append('file',{
  //   uri: fileUri,
  //   type:'image/jepg',
  //   name:'upload_image.jpg'
  //   })
  //   data.append('upload_preset','demo_hoalen')
  //   data.append('cloud_name','dtzbo0fwp')
    
  return (
    <View style={{backgroundColor:'#F5F5F5',flex:1,alignItems:'center'}}>

      <ItemPersonnal title={'Đơn hàng của tôi'} title2={`Đã có ${lenght} đơn hàng`}/>
      <ItemPersonnal title={'Địa chỉ giao hàng'} title2={`${lenght} Địa chỉ`}/>
      <ItemPersonnal title={'Đánh giá của tôi'} title2={`Đã đánh giá ${lenght} mục`}/>
      <ItemPersonnal title={'Cài đặt'} title2={`Thông báo, mật khẩu, chủ đề,...`}/>
    </View>
  )
}

export default PersonnalScreen

const styles = StyleSheet.create({})