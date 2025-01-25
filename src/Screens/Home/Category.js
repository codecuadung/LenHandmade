import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Category = ({ navigation }) => {
  const category = [
    { name: 'Hoa len lẻ', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/10/hoa-bap-bang-len-300x300.jpg', id: 'hoa-len-le' },
    { name: 'Hoa len bó', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/07/32-300x300.jpg', id: 'hoa-len-bo' },
    { name: 'Phụ kiện len', image: 'https://hoalenhandmade.com/wp-content/uploads/2024/06/moc-khoa-len-nho-1k-300x300.jpg', id: 'phu-kien-len' },
    { name: 'Len trang trí', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/11/kich-thuong-hoa-len-de-ban-300x300.jpg', id: 'len-trang-tri' },
  ];

  const cartCategory = ({ item, index }) => {
    return (
      <View style={styles.categoryItem}>
        <TouchableOpacity
          style={styles.cartview}
          onPress={() =>
            navigation.navigate('ProductList', { categoryId: item.id, categoryName: item.name, index })
          }
        >
          <Image source={{ uri: item.image }} style={styles.categoryImage} />
          <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh mục</Text>
      <FlatList
        data={category}
        renderItem={cartCategory}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cartview: {
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Category;
