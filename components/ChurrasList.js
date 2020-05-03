import React, { Component, useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from 'react-native';
import NewChurras from './NewChurras';
import { displayData } from './Form';
import Moment from 'moment';

function Item({ title, date, key }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity>
        <Image style={styles.deleteBin} source={require('../assets/can.png')} />
      </TouchableOpacity>
      <Text style={styles.date}>{Moment.unix(date).format('DD/MM')}</Text>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Image
          style={styles.deleteBin}
          source={require('../assets/edit.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function ChurrasList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const retrievedData = (await displayData()).map(([, value]) =>
        JSON.parse(value)
      );
      if (retrievedData && retrievedData.length) {
        setData(retrievedData);
      }
    };
    getData();
  }, []);

  const onSubmitForm = async values => {
    const unixTimestamp = Moment(values.date)
      .unix()
      .toString();
    const finalValues = { ...values, date: unixTimestamp };
    await AsyncStorage.setItem(unixTimestamp, JSON.stringify(finalValues));
    setData([...data, finalValues]);
  };

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item title={item.title} date={item.date} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <NewChurras onSubmitForm={onSubmitForm} />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    flex: 1,
  },
  date: {
    fontSize: 20,
    flex: 1,
    fontWeight: 'bold',
  },
  deleteBin: {
    width: 20,
    height: 20,
  },
});
