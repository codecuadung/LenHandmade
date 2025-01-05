import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { memo } from 'react';

const ProductCategory = ({data}) => {
  const navigation = useNavigation();
  const {products, title} = data; // Lấy sản phẩm và tiêu đề từ props
  

  // Hàm tính toán giá min và giá max
  const minMaxPrice = subVariants => {
    const priceVariants = subVariants.map(variant => variant.price); // Lấy danh sách giá
    const minPrice = Math.min(...priceVariants); // Tìm giá nhỏ nhất
    const maxPrice = Math.max(...priceVariants); // Tìm giá lớn nhất

    return {minPrice, maxPrice};
  };
  // thêm chấm vào giá
  const formatPrice = (price)=> price.toLocaleString('de-DE')

  const renderItem = ({item}) => {
    let priceAfterSaleMin, priceAfterSaleMax;
    let updateData = item
  // giá sau giảm khi mà có chỉ 1 biến thể
    if (item.sub_variants.length === 1) {
      priceAfterSaleMin = item.sale
        ? item.sub_variants[0].price - item.sub_variants[0].price * item.sale /100
        : item.sub_variants[0].price;

        // thêm giá sau giảm vào item để truyền vào màn hình chi tiết sản phẩm
         updateData = {...item,priceAfterSaleMin,}
    } else if (item.sub_variants.length > 1) {
      // Tính min và max price cho trường hợp có nhiều biến thể
      const { minPrice, maxPrice } = minMaxPrice(item.sub_variants);
      
      priceAfterSaleMin = item.sale
        ? minPrice - minPrice * item.sale /100
        : minPrice;
      
      priceAfterSaleMax = item.sale
        ? maxPrice - maxPrice * item.sale /100
        : maxPrice;

         // thêm giá sau giảm vào item để truyền vào màn hình chi tiết sản phẩm
         updateData = {...item,priceAfterSaleMax,priceAfterSaleMin,minPrice,maxPrice}
    }
  
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail',{item:updateData})}>
        <View style={styles.productContainer}>
          <Image source={{uri: item.image}} style={styles.productImage} />
          <Text numberOfLines={2} ellipsizeMode='tail' style={styles.productName}>
            {item.name}
          </Text>
  
          {/* Hiển thị giá cho trường hợp có 1 biến thể */}
          {item.sub_variants && item.sub_variants.length === 1 && (
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.textPrice,item.sale ? styles.priceSale : styles.price,]}>
              Giá: {formatPrice(item.sub_variants[0].price)} VND
            </Text>
          )}
  
          {/* Hiển thị giá min/max cho trường hợp có nhiều biến thể */}
          {item.sub_variants && item.sub_variants.length > 1 ? (
            minMaxPrice(item.sub_variants).minPrice === minMaxPrice(item.sub_variants).maxPrice ? (
              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.textPrice}>
                Giá: {formatPrice(minMaxPrice(item.sub_variants).minPrice)} VND
              </Text>
            ) : (
              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.textPrice}>
                Giá: {formatPrice(minMaxPrice(item.sub_variants).minPrice)} -{' '}
                {formatPrice(minMaxPrice(item.sub_variants).maxPrice)} VND
              </Text>
            )
          ) : null}
  
          {/* Hiển thị giá sale cho min và max price nếu có */}
          {item.sale && item.sub_variants.length > 1 && (
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.salePrice}>
              Giá sau giảm: {Math.round(priceAfterSaleMin)} -{' '}
              {Math.round(priceAfterSaleMax)} VND
            </Text>
          )}
  
          {/* Hiển thị giá sale cho trường hợp có 1 biến thể */}
          {item.sale && item.sub_variants.length === 1 && (
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.salePrice}>
              Giá sau giảm: {Math.round(priceAfterSaleMin)} VND
            </Text>
          )}
  
          <TouchableOpacity style={styles.addToCartButton}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.plusIcon}>
                <Image
                  style={styles.plush}
                  source={require('../../assets/cong.png')}
                />
              </View>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                Thêm giỏ hàng
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Hiển thị tiêu đề danh mục */}
      <Text style={styles.categoryTitle}>{title}</Text>

      {/* Hiển thị sản phẩm */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        contentContainerStyle={styles.flatListContainer}
        initialNumToRender={5}
      />
    </View>
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContainer: {
    padding: 10,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    width: 180,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 162,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#67B3FA',
    marginTop: 10,
    marginBottom: 5,
  },
  productQuantity: {
    color: '#555',
    marginBottom: 5,
  },
  textPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  priceSale: {
    color: 'red',
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 50,
  },
  addToCartButton: {
    position: 'absolute', // Cố định vị trí
    bottom: 0, // Căn dưới phần tử cha
    left: 0, // Căn trái
    right: 0, // Căn phải để nút trải rộng
    backgroundColor: '#FF714B',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10, // Cách đều 2 bên (nếu cần)
    marginBottom: 10, // Khoảng cách với đáy (nếu cần)
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  plush: {
    width: 25,
    height: 25,
  },
});
