import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const categories = [
  {
    id: 'hoa-len-le',
    title: 'Hoa len lẻ',
    data: [
      { name: 'Bông len 1', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/10/hoa-bap-bang-len-300x300.jpg' },
      { name: 'Bông len 2', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/10/hoa-bap-bang-len-300x300.jpg' },
    ],
  },
  {
    id: 'hoa-len-bo',
    title: 'Hoa len bó',
    data: [
      { name: 'Bó len 1', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/07/32-300x300.jpg' },
      { name: 'Bó len 2', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/07/32-300x300.jpg' },
    ],
  },
  {
    id: 'phu-kien-len',
    title: 'Phụ kiện len',
    data: [
      { name: 'Móc khóa 1', image: 'https://hoalenhandmade.com/wp-content/uploads/2024/06/moc-khoa-len-nho-1k-300x300.jpg' },
      { name: 'Móc khóa 2', image: 'https://hoalenhandmade.com/wp-content/uploads/2024/06/moc-khoa-len-nho-1k-300x300.jpg' },
    ],
  },
  {
    id: 'len-trang-tri',
    title: 'Len trang trí',
    data: [
      { name: 'Trang trí 1', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/11/kich-thuong-hoa-len-de-ban-300x300.jpg' },
      { name: 'Trang trí 2', image: 'https://hoalenhandmade.com/wp-content/uploads/2023/11/kich-thuong-hoa-len-de-ban-300x300.jpg' },
    ],
  },
];

const CategoryScreen = ({ route }) => {
  const { index: initialIndex } = route.params;

  const [index, setIndex] = useState(initialIndex || 0);
  const [routes] = useState(categories.map((cat) => ({ key: cat.id, title: cat.title })));

  const renderScene = SceneMap(
    categories.reduce((scenes, category) => {
      scenes[category.id] = () => (
        <FlatList
          data={category.data}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          )}
        />
      );
      return scenes;
    }, {})
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 360 }} // Độ rộng màn hình
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
          indicatorStyle={styles.tabIndicator}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  productItem: { flexDirection: 'column', alignItems: 'center', marginVertical: 10 },
  productImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 5 },
  productName: { fontSize: 14, color: '#333' },
  tabBar: { backgroundColor: '#fff' },
  tabLabel: { color: '#333', fontWeight: 'bold' },
  tabIndicator: { backgroundColor: '#6200EE', height: 3 },
});

export default CategoryScreen;
