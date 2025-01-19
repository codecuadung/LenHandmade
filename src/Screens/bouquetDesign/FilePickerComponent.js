import { Alert, StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '@env';

const uploadFileToCloudinary = async (fileUri) => {
  const data = new FormData();
  data.append('file', {
    uri: fileUri,
    type: 'application/pdf', // MIME type chính xác
    name: 'uploaded_file.pdf', // Tên file
  });
  data.append('upload_preset', 'demo_hoalen'); // Upload preset của bạn
  data.append('cloud_name', 'dtzbo0fwp'); // Tên cloud của bạn

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dtzbo0fwp/raw/upload', // Đúng endpoint
      {
        method: 'POST',
        body: data,
      }
    );

    const result = await response.json();
    console.log('Cloudinary response:', result);

    if (result.secure_url) {
      return result.secure_url; // Trả về link file đã upload
    } else {
      throw new Error(
        `Error from Cloudinary: ${result.error?.message || 'Unknown error'}`
      );
    }
  } catch (error) {
    console.error('Tải file lên thất bại:', error.message || error);
    throw error;
  }
};

const FilePickerComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFileUrl, setUploadFileUrl] = useState(null); // Lưu link file upload
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const pickFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Giới hạn kích thước file tải lên (10MB)
      const maxsize = 10 * 1024 * 1024;
      if (file[0].size > maxsize) {
        Alert.alert(
          'File quá lớn',
          'Vui lòng chọn file nhỏ hơn 10MB hoặc liên hệ với chủ shop.'
        );
        return;
      }

      setSelectedFile(file[0]);
      setLoading(true); // Bắt đầu trạng thái loading

      // Gọi hàm upload lên Cloudinary
      const uploadedUrl = await uploadFileToCloudinary(file[0].uri);
      setUploadFileUrl(uploadedUrl); // Lưu link file sau khi upload
      Alert.alert('Tải file thành công', `File đã được tải lên: ${uploadedUrl}`);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User không chọn file.');
      } else {
        console.log('FilePicker Error:', error);
      }
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Button title="Chọn tệp" onPress={pickFile} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}
      {selectedFile && !loading && (
        <Text style={{ marginTop: 10 }}>
          Tên tệp: {selectedFile.name}
          {'\n'}Kích thước: {selectedFile.size} bytes
          {'\n'}Loại: {selectedFile.type}
        </Text>
      )}
      {uploadFileUrl && !loading && (
        <Text style={{ marginTop: 10, color: 'green' }}>
          File đã upload: {uploadFileUrl}
        </Text>
      )}
    </View>
  );
};

export default FilePickerComponent;

const styles = StyleSheet.create({});
