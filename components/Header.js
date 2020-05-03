import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import Imagem from '../assets/header.png'

export default function Header() {
  return (
    <View>
      <ImageBackground source={Imagem} style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <Text style={styles.title}>
        Open Churras
      </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 50,
    width: 45,
    margin: 20,
    marginRight: 10,
    marginTop: 35
  },
  title: {
    marginTop: 45,
    color: '000000',
    fontSize: 30,
  }
});
