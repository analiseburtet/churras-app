import React, { Component, useState } from "react";
import { Text, View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import NewChurras from './NewChurras'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Churras Ana',
    date:"2020-05-15",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Churras doguinhos',
    date:"2020-05-15",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Churras da Firma',
    date:"2020-05-15",
  },
];

function Item({ title, date }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title} {date}</Text>
    </View>
  );
}

export default function ChurrasList() {
  return (
    <View>
       <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} date={item.date}/>}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={styles.item}>
        <NewChurras/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
      shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title: {
    fontSize: 20,
  },
});