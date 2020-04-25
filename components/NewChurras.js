import React, { Component, useState } from "react";
import { View, StyleSheet, Image, Text, Alert, Modal, TouchableHighlight } from 'react-native';
import Form from './Form'

const NewChurras = () => {
  const [ modalVisible, setModalVisible ] = useState(false);
  return (
    <View style={styles.container}>
    {/* modal form to add new churras */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Form/>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {/* !modal form to add new churras */}
      {/* open modal to create new churras */}
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
      
        <Text style={styles.textStyle}>
        <Image style={styles.barbecue}
        source={require('../assets/barbecue.png')}
      />
        Novo Churras</Text>
      </TouchableHighlight>
      {/* !open modal to create new churras */}
    </View>
  )
}

const styles = StyleSheet.create({
  barbecue: {
    height: 20,
    width: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    flex: 1,
    marginTop: 70,
  },
});

export default NewChurras
