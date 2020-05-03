import React, { Component, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Form from './Form';

const NewChurras = ({ onSubmitForm }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        style={styles.modalView}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>X</Text>
            </TouchableHighlight>
            <Form onSubmitForm={onSubmitForm} />
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <View>
          <Image style={styles.plus} source={require('../assets/plus.png')} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'gainsboro',
    flex: 1,
    borderRadius: 20,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'orange',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#FFD836',
    width: 60,
    height: 60,
    borderRadius: 1000,
    position: 'absolute',
    bottom: -400,
    right: 10,
  },
});

export default NewChurras;
