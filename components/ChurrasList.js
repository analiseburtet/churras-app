import React, { Component, useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import NewChurras from './NewChurras'
import { displayData } from './Form'
import Moment from 'moment'

function Item({ title, date }) {
  return (
    <View style={styles.item}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function ChurrasList() {
  const [ data, setData ] = useState([])
  const [ item, setItem ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const retrievedData = await displayData()
      if(retrievedData && retrievedData.length) setData(retrievedData)
    }
    getData()
  }, [])

  const onSubmitForm = async (values) => {  
    const unixTimestamp = Moment(values.date).format('DD-MM').toString();
    const finalValues = { ...values, date: unixTimestamp };
    await AsyncStorage.setItem(unixTimestamp, JSON.stringify(finalValues));
    setData([...data, finalValues]);
  }

  return (
    <View>
       <SafeAreaView>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.title} date={item.date} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={styles.addEvent}>
        <NewChurras onSubmitForm={onSubmitForm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
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
    flex: 1
  },
  date: {
    fontSize: 20,
    flex: 1,
    fontWeight: 'bold'
  },
  addEvent: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'gainsboro',
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
});