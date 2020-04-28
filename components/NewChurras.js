import React, { Component, useState } from "react";
import { View, StyleSheet, Image, Text, Alert, Modal, TouchableHighlight } from 'react-native';
import Form from './Form'

const NewChurras = ({onSubmitForm}) => {
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
              <Text>X</Text>
            </TouchableHighlight>
            <Form onSubmitForm={onSubmitForm}/>
          </View>
        </View>
      </Modal>
      {/* !modal form to add new churras */}
      {/* open modal to create new churras */}
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
      <View>
        <View style={styles.openButton}>
          <Image style={styles.barbecue} source={require('../assets/barbecue.png')}/>
        </View>
        <Text style={styles.textStyle}>Add Barbecue</Text>
      </View>  
      </TouchableHighlight>
      {/* !open modal to create new churras */}
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'gainsboro',
    margin: 20,
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
    backgroundColor: 'orange',
    width: 60,
    height: 60,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barbecue: {
    width: 40,
    height: 30
  },
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default NewChurras