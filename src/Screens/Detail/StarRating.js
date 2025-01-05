import React from 'react'
import { View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const StarRating = ({ fullStars, halfStar, emptyStars }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {/* Hiển thị sao đầy đủ */}
      {Array(fullStars).fill().map((_, index) => (
        <Image
          key={`gold-star-${index}`} // Key duy nhất cho mỗi sao vàng
          source={require('../../assets/starGold.png')} 
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
        />
      ))}

      {/* Hiển thị sao nửa */}
      {halfStar && (
        <Image
          key="half-star" // Key cho sao nửa (chỉ có một sao nửa)
          source={require('../../assets/starHalf.png')} // Đường dẫn đến tệp ảnh sao nửa
          style={{ width: 23, height: 23}}
          resizeMode="contain"
        />
      )}

      {/* Hiển thị sao rỗng */}
      {Array(emptyStars).fill().map((_, index) => (
        <Image
          key={`gray-star-${index}`} // Key duy nhất cho mỗi sao rỗng
          source={require('../../assets/starGray.png')}
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
        />
      ))}
    </View>
  )
}

export default StarRating
