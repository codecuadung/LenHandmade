import { Alert, StyleSheet, Text, View,Button } from 'react-native'
import React,{useState} from 'react'
import DocumentPicker from 'react-native-document-picker'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '@env';




const FilePickerComponent = () => {
    const [selectedFile,setSelectedFile] = useState(null)
 

    const pickFile = async()=>{
        try {
            const file = await DocumentPicker.pick({
                type:[DocumentPicker.types.allFiles],
            })

            //giới hạn kích thước file tải lên 10 MB
            const maxsize = 10 * 1024 * 1024

            if(file[0].size>maxsize){
                Alert.alert('Flie quá lớn, vui lòng chọn file nhở hơn 10MB hoặc liên hệ với chủ shop')
                return
            }
            setSelectedFile(file[0])
        } catch (error) {
            if(DocumentPicker.isCancel(error)){
                console.log('user không chọn file')
            }else{
                console.log('FilePicker Error: ', error)
            }
        }
    }
  return (
    <View style={{ marginVertical: 10 }}>
    <Button title="Chọn tệp" onPress={pickFile} />
    {selectedFile && (
      <Text style={{ marginTop: 10 }}>
        Tên tệp: {selectedFile.name}
        {'\n'}Kích thước: {selectedFile.size} bytes
        {'\n'}Loại: {selectedFile.type}
      </Text>
    )}
  </View>
);
};

export default FilePickerComponent

const styles = StyleSheet.create({})