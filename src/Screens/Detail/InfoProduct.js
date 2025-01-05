import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AverageStar from './AverageStar';
import Describe from './Describe';

const InfoProduct = ({ data }) => {
  const [variant, setVariant] = useState(data);
  // subVariant lưu biến thể phụ hiển thị sau khi người dùng chọn color hoặc style
  const [subVariant,setSubVariant] = useState([])
  const [quantity, setQuantity] = useState('1');

  const dots = (price) => price.toLocaleString('de-DE');

  // Hàm tính toán khoản tiết kiệm
  const calculateSavings = () => {
    let saveMin, saveMax;
    if (variant.sub_variants.length > 1) {
      saveMin = variant.minPrice - variant.priceAfterSaleMin;
      saveMax = variant.maxPrice - variant.priceAfterSaleMax;
    } else {
      saveMin = variant.sub_variants[0].price - variant.priceAfterSaleMin;
      saveMax = saveMin; // Nếu chỉ có một giá trị, gán `saveMax` bằng `saveMin`.
    }
    return { saveMin, saveMax };
  };

  const { saveMin, saveMax } = calculateSavings();


  // Lấy toàn bộ color hoặc style
  const getColorAndStyle = () => {
    if (variant.sub_variants[0].color === null) {
      const allStyle = data.sub_variants.map((item) => item.style);
      const allColor = null;
      return { allColor, allStyle };
    } else {
      const allColor = data.sub_variants.map((item) => item.color);
      const allStyle = null;
      return { allColor, allStyle };
    }
  };
  const colorOrStyle = getColorAndStyle();


  // Hàm xử lý input
  const handlerQuantity = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue !== '' && parseInt(numericValue, 10) > 0) {
      setQuantity(numericValue);
    } else {
      setQuantity('');
    }
  };
  //xử lý dấu trừ
  const handleSubtract = () => {
    setQuantity((prevQuantity) => {
      const currentQuantity = parseInt(prevQuantity) || 1;
      return String(Math.max(1, currentQuantity - 1));
    });
  };
  //xử lý dấu cộng
  const handleAdd = () => {
    setQuantity((prevQuantity) => {
      const currentQuantity = parseInt(prevQuantity) || 0;
      return String(currentQuantity + 1);
    });
  };

  //hàm lấy variant dựa trên color hoặc style
  const variantProduct = (item)=>{
    if(variant.sub_variants[0].color ===null){
      const product = variant.sub_variants.filter((varialble)=>varialble.style === item)
      //đưa dữ liệu biến thể người dùng chọn vào subvarian
      setSubVariant({...product,name:variant.name,describe:variant.describe,sale:variant.sale})
      console.log('subVariant',subVariant)
    }else{
      const product = variant.sub_variants.filter((varialble)=>varialble.color === item)
      setSubVariant({...product,name:variant.name,describe:variant.describe,sale:variant.sale})
      console.log('subVariant',subVariant)
    }
  }

  
  return (
    <View style={styles.container}>
      {/* Ảnh, tên và số sao */}
      <View style={styles.imageContainer}>
        {subVariant.length === 0? (<Image style={styles.productImage} source={{ uri: variant.image }} />): ( <Image style={styles.productImage} source={{ uri: subVariant[0].image }} />)}

        <Text style={styles.productName}>{variant.name}</Text>
        {/* <AverageStar data={variant} /> */}
      </View>
      <View style={styles.separator} />

      {/* Giá */}
      

     {/* Kiểm tra và hiển thị giá */}
{subVariant.length === 0 ? (
  variant.sub_variants.length > 1 ? (
    <Text style={styles.priceText}>
      Giá: {dots(variant.priceAfterSaleMin)} - {dots(variant.priceAfterSaleMax)} VNĐ
    </Text>
  ) : (
    <Text style={styles.priceText}>
      Giá: {dots(variant.priceAfterSaleMin)} VNĐ
    </Text>
  )
) : (
  <Text style={styles.priceText}>Giá: {dots(subVariant[0].price)} VNĐ</Text>
)}

      {/* Giá chính hãng và phần trăm giảm */}
      {/* <View style={styles.discountContainer}>
        <Text>Giá chính hãng: </Text>
        {variant.sub_variants.length > 1 ? (
          <Text style={styles.strikethroughText}>
            {dots(variant.minPrice)} - {dots(variant.maxPrice)} VNĐ
          </Text>
        ) : (
          <Text style={styles.strikethroughText}>
            {dots(variant.sub_variants[0].price)} VNĐ
          </Text>
        )}
        <Text style={styles.discountBadge}>
          - {variant.sale}%
        </Text>
      </View> */}

      {/* Hiển thị khoản tiết kiệm */}
      {/* <View style={styles.savingsContainer}>
        {variant.sub_variants.length > 1 ? (
          <View style={styles.savingsRow}>
            <Text style={styles.savingsLabel}>Tiết kiệm:</Text>
            <Text style={styles.savingsText}> {dots(saveMin)} - {dots(saveMax)} VNĐ</Text>
          </View>
        ) : (
          <View style={styles.savingsRow}>
            <Text style={styles.savingsLabel}>Tiết kiệm:</Text>
            <Text style={styles.savingsText}> {dots(saveMin)} VNĐ</Text>
          </View>
        )}
      </View> */}

      {/* Color hoặc style */}
      {colorOrStyle.allColor !== null ? (
        <View style={styles.colorContainer}>
          <Text style={styles.boldText}>Màu sắc: </Text>
          <FlatList
            data={colorOrStyle.allColor}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{variantProduct(item)}}>
                <View style={[styles.colorItem, { backgroundColor: item }]} />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.boldText}>Kiểu dáng: </Text>
          <FlatList
            data={colorOrStyle.allStyle}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{variantProduct(item)}}>
                <View style={styles.styleItem}>
                  <Text style={styles.styleText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Số lượng */}
      <View style={styles.quantityContainer}>
        <Text style={styles.boldText}>Số lượng: </Text>
        <TouchableOpacity onPress={handleSubtract}>
          <Image style={styles.quantityButton} source={require('../../assets/tru.png')} />
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={quantity}
          keyboardType="numeric"
          onChangeText={handlerQuantity}
        />
        <TouchableOpacity onPress={handleAdd}>
          <Image style={styles.quantityButton} source={require('../../assets/cong.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      <Describe describe={variant.describe} />
    </View>
  );
};

export default InfoProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  productImage: {
    width: 300,
    height: 300,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#67B3FA',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  separator: {
    backgroundColor: '#FF714B',
    width: 50,
    height: 1,
    marginTop: 20,
  },
  priceText: {
    marginTop: 20,
    fontSize: 18,
    color: '#FF714B',
    fontWeight: 'bold',
  },
  discountContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: 'red',
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  savingsContainer: {
    paddingVertical:10
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsLabel: {
    fontWeight: 'bold',
    fontSize:16
  },
  savingsText: {
    fontSize: 18,
    color: '#FF714B',
    fontWeight: 'bold',
  },
  colorContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorItem: {
    width: 20,
    height: 20,
    margin: 5,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 4,
  },
  
  styleItem: {
    borderColor: '#FF714B',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  styleText: {
    color: '#FF714B',
    fontWeight: 'bold',
  },
  quantityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize:16
  },
  quantityContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  quantityButton: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  quantityInput: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  addToCartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#67B3FA',
    padding: 10,
    width: '90%',
    borderRadius: 10,
    marginTop: 30,
  },
  addToCartText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
