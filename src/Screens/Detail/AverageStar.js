import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StarRating from './StarRating'

const AverageStar = ({ data }) => {
  const [star, setStar] = useState([])
  const [average, setAverage] = useState(0)
  const [fullStars, setFullStars] = useState(0)
  const [halfStar, setHalfStar] = useState(false)
  const [emptyStars, setEmptyStars] = useState(0)

  useEffect(() => {
    const totalStar = () => {
      const allStar = data.sub_variants.flatMap(variant => variant.evaluate.map(evaluate => evaluate.star))
      setStar(allStar)
    }
    totalStar()
  }, [data])

  useEffect(() => {
    if (star.length > 0) {
      // Tính tổng và trung bình cộng của các phần tử trong mảng star
      const sum = star.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const avg = sum / star.length
      setAverage(avg)
    }
  }, [star])

  useEffect(() => {
    if (average > 0) {
      // Tính số lượng sao vàng và sao nửa
      let fullStarsCount = Math.floor(average)
      let hasHalfStar = false

      if (average % 1 > 0 && average % 1 <= 0.5) {
        hasHalfStar = true
      } else if (average % 1 > 0.5) {
        fullStarsCount += 1
      }

      const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0)

      setFullStars(fullStarsCount)
      setHalfStar(hasHalfStar)
      setEmptyStars(emptyStarsCount)
    }
  }, [average])

  return (
    <View style={{flexDirection:'row',justifyContent:'center'}}>
      {/* Sử dụng StarRating component */}
      <StarRating fullStars={fullStars} halfStar={halfStar} emptyStars={emptyStars} />
      <Text style={{fontSize:10,color:'gray',marginLeft:5}}>{star.length} reviews</Text>
    </View>
  )
}

export default AverageStar

const styles = StyleSheet.create({})
