import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const Describe = ({ describe }) => {
  const [showMaterial, setShowMaterial] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const toggleShowMaterial = () => {
    setShowMaterial(!showMaterial);
  };

  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Mô tả</Text>
      <View style={styles.divider} />

      {/* Material Section */}
      <TouchableOpacity onPress={toggleShowMaterial}>
        <View style={styles.row}>
          <Text style={styles.text}>Chất liệu</Text>
          <Image
            style={styles.icon}
            source={
              showMaterial
                ? require('../../assets/sortUp.png')
                : require('../../assets/sortDown.png')
            }
          />
        </View>
      </TouchableOpacity>
      {showMaterial && <Text style={styles.subText}>- {describe.material}</Text>}

      <View style={styles.divider} />

      {/* Detail Section */}
      <TouchableOpacity onPress={toggleShowDetail}>
        <View style={styles.row}>
          <Text style={styles.text}>Chi tiết</Text>
          <Image
            style={styles.icon}
            source={
              showDetail
                ? require('../../assets/sortUp.png')
                : require('../../assets/sortDown.png')
            }
          />
        </View>
      </TouchableOpacity>
      {showDetail && <Text style={styles.subText}>- {describe.detail}</Text>}
    </View>
  );
};

export default Describe;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  divider: {
    backgroundColor: '#ddd',
    height: 1,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#555', // Add tint color to icons for consistency
  },
});
