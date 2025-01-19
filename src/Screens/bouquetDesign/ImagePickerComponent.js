import { Alert, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'; // Import các thành phần UI cần thiết
import React, { useState } from 'react'; // Import React và useState để quản lý trạng thái
import { launchImageLibrary } from 'react-native-image-picker'; // Import hàm chọn ảnh từ thư viện
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '@env';

// Hàm tải ảnh lên Cloudinary
const uploadImageToCloudinary = async (fileUri) => {
  console.log("name",CLOUDINARY_CLOUD_NAME); // In ra giá trị của CLOUDINARY_CLOUD_NAME
 
  const data = new FormData(); 
  data.append('file', {
    uri: fileUri,
    type: 'image/jpeg',
    name: 'uploaded_image.jpg',
  });
  data.append('upload_preset', 'demo_hoalen'); 
  data.append('cloud_name', 'dtzbo0fwp'); 

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dtzbo0fwp/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    );

    const result = await response.json(); 
    console.log('Cloudinary response:', result); // Ghi log toàn bộ phản hồi

    if (result.secure_url) {
      return result.secure_url; 
    } else {
      throw new Error(`Error from Cloudinary: ${result.error?.message || 'Unknown error'}`); // Log lỗi chi tiết từ phản hồi
    }
  } catch (error) {
    console.error('Tải ảnh lên thất bại:', error.message || error); 
    throw error; 
  }
};


const ImagePickerComponent = () => {
  // State quản lý ảnh được chọn từ thư viện
  const [selectedImage, setSelectedImage] = useState(null);

  // State quản lý URL ảnh đã tải lên Cloudinary
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Hàm chọn ảnh từ thư viện
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User đã hủy chọn ảnh'); 
      } else if (response.errorCode) {
        console.log('ImagePicker error:', response.errorMessage); 
      } else {
        const uri = response.assets[0].uri; 
        setSelectedImage(uri); 
  
        try {
          const uploadUrl = await uploadImageToCloudinary(uri); 
          setUploadedImageUrl(uploadUrl); 
          console.log('Upload ảnh thành công:', uploadUrl); 
        } catch (error) {
          Alert.alert('Lỗi', error.message || 'Không thể tải ảnh lên'); // Hiển thị lỗi cho người dùng
          console.error('Lỗi chi tiết:', error); 
        }
      }
    });
  };
  
  return (
    <View style={styles.container}>

      {/* Hiển thị ảnh đã chọn */}
      <Text>Chọn ảnh từ thư viện</Text>
      <TouchableOpacity onPress={pickImage}>
      {selectedImage? (
        <Image
          source={{ uri: selectedImage }} // Hiển thị ảnh từ URI
          style={styles.image}
        />
      ):(
        <Image style={styles.image} source={require('../../assets/camera.png')}/>
      )}
      </TouchableOpacity>

      {/* Hiển thị URL ảnh đã tải lên */}
      {uploadedImageUrl && (
        <Text style={styles.uploadedText}>
          Ảnh đã tải lên: {'\n'}
          {uploadedImageUrl}
        </Text>
      )}
    </View>
  );
};

export default ImagePickerComponent;

// Định dạng CSS cho component
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 150, // Chiều rộng ảnh hiển thị
    height: 150, // Chiều cao ảnh hiển thị
    marginTop: 10,
  },
  uploadedText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green', // Màu chữ thông báo thành công
  },
});
