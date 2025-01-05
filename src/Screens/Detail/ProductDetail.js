import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/header'
import { ScrollView } from 'react-native-gesture-handler'
import InfoProduct from './InfoProduct'

const ProductDetail = ({route}) => {
  const {item} = route.params
 

  return (
    <ScrollView >
      <View>
        <Header title={'Chi tiết sản phẩm'} />
        <InfoProduct data={item}/>
       
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
})

export default ProductDetail
