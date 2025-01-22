import { StyleSheet, Text, View,Animated,Image} from 'react-native'
import React,{useEffect,useRef} from 'react'

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1500, // Thời gian để hiển thị hình ảnh
        useNativeDriver: true,
      }
    ).start();

    const timeout = setTimeout(() => {
      navigation.replace('Login')
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff' }}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            },
          ],
        }}
      >
        <Image
          style={{ width: 200, height: 200, borderRadius: 20 }}
          source={{ uri: 'https://hoalenhandmade.com/wp-content/uploads/2023/06/cropped-logo-hoa-len-co-nem-trang.png.webp' }}
        />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đan hi vọng, móc yêu thương</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen

const styles = StyleSheet.create({})