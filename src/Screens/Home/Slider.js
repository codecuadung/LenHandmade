import React, { useRef, useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const images = [
  'https://hoalenhandmade.com/wp-content/uploads/2024/08/banner-nhan-dien-hoa-len-handmade-1536x768.jpg',
  'https://hoalenhandmade.com/wp-content/uploads/2024/08/dich-vu-dan-moc-theo-yeu-cau-1536x768.jpg',
  'https://hoalenhandmade.com/wp-content/uploads/2024/08/giam-gia-cho-khach-hang-mua-lan-dau-1536x768.jpg',
  'https://hoalenhandmade.com/wp-content/uploads/2024/08/ho-tro-khach-hang-nhiet-tinh-1536x768.jpg',
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height:170,
    marginTop:20
  },
  image: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'cover',
    borderRadius:20
    
  },
});

export default Slider;
