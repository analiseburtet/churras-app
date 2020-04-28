import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import Image from '../assets/header.png'

export default function Header() {
  return (
    <View>
      <ImageBackground source={Image} style={styles.image}>
      <Text style={styles.title}>
        Barbecue App
      </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    height: 80,
    alignItems: 'center',
  },
  title: {
     color: '#ffffff',
     fontWeight: 'bold',
     fontSize: 30,
  }
});
