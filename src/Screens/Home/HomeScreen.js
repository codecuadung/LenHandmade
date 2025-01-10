import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React,{useEffect} from 'react'
import HeaderHome from './HeaderHome'
import Slider from './Slider'
import Category from './Category'
import ProductCategory from './ProductCategory'

import { useTheme } from '../../utils/ThemeContext'
import { darkTheme,lightTheme } from '../../utils/Theme'
import { ScrollView } from 'react-native-gesture-handler'

import { useDispatch,useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/thunks/fetchProducts'

const HomeScreen = () => {
  const cartItemCount = 3

  const {isDarkMode} = useTheme()
  
  const background = isDarkMode? darkTheme.colors.background2 : lightTheme.colors.background2

  //gọi products
  const dispatch = useDispatch()
    
    // Lấy dữ liệu từ Redux store
    const { items, loading, error } = useSelector((state) => state.products)
    useEffect(() => {
      dispatch(fetchProducts()) // Gửi action để lấy sản phẩm
    }, [dispatch])
  
    // Hiển thị khi đang tải dữ liệu
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  
    // Hiển thị khi có lỗi
    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Có lỗi xảy ra! Vui lòng thử lại sau.</Text>
        </View>
      )
    }
const ProductNew = items.filter((product)=>product.productGroup.newProduct ===true)
const ProductPopular = items.filter((product)=>product.productGroup.popularProduct ===true)
const ProductSale = items.filter((product)=>product.productGroup.saleProduct ===true)
  return (
   <ScrollView style={[styles.container,{backgroundColor:background}]}>
    <View >
      <HeaderHome cartItemCount={cartItemCount}/>

      <Slider/>

      <Category/>

      <ProductCategory data={{ products: ProductNew, title: 'Sản phẩm mới' }}/>

      <ProductCategory data={{ products: ProductPopular, title: 'Sản phẩm phổ biến' }}/>

      <ProductCategory data={{ products: ProductSale, title: 'Sản phẩm sale' }}/>

    </View>
    </ScrollView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    
  }
})