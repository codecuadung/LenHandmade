import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderHome from '../../components/HeaderHome'
import ImagePickerComponent from './ImagePickerComponent'
import FilePickerComponent from './FilePickerComponent'

const DesignScreen = () => {
  return (
    <View>
      <HeaderHome/>
      <Text>Móc đan len theo yêu cầu</Text>
      <ImagePickerComponent/>
      <FilePickerComponent/>
      
    </View>
  )
}

export default DesignScreen

const styles = StyleSheet.create({})