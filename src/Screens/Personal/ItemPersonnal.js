import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemPersonnal = ({title,title2}) => {
  return (
      <TouchableOpacity>
        <View style={{borderRadius:10,width:'90%',backgroundColor:'#FFFFFF',marginBottom:20,padding:15}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{title}</Text>
        <Text>{title2}</Text>
        <Image style={{width:15,height:15,position:'absolute',right:10,top:25}} source={require('../../assets/arrowRight.png')}/>
        </View>
      </TouchableOpacity>
  )
}

export default ItemPersonnal

const styles = StyleSheet.create({})