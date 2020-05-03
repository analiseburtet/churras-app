import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
  AsyncStorage,
  FlatList,
  CheckBox,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Formik } from 'formik';
import Moment from 'moment';

function Item({ name, amount, isVegan, contributed, drink }) {
  return (
    <View style={styles.list}>
      <CheckBox value={contributed} onValueChange={!contributed} />
      <Text>{name}</Text>
      <Text>$ {amount}</Text>
      <CheckBox value={isVegan} onValueChange={!isVegan} />
      <CheckBox value={drink} onValueChange={!drink} />
    </View>
  );
}

const Form = props => (
  <Formik
    initialValues={{
      title: '',
      date: Moment(),
      totalAmount: 0,
      people: [
        {
          name: 'Ana',
          amount: 20,
          isVegan: true,
          contributed: true,
          drink: true,
        },
      ],
    }}
    onSubmit={props.onSubmitForm}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <ScrollView>
          <View style={styles.list}>
            <TextInput
              style={{ height: 40 }}
              placeholder="Type here"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              title={values.title}
            />
            <DatePicker
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
              date={values.date}
              mode="date"
              onDateChange={handleChange('date')}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.listItem}>Paid</Text>
            <Text style={styles.listItem}>Guest</Text>
            <Text style={styles.listItem}>Amount</Text>
            <Text style={styles.listItem}>Vegan</Text>
            <Text style={styles.listItem}>Drinks</Text>
          </View>
          <SafeAreaView>
            <FlatList
              data={values.people}
              keyExtractor={key => values.date}
              renderItem={({ item }) => (
                <Item
                  name={item.name}
                  amount={item.amount}
                  isVegan={item.isVegan}
                  contributed={item.contributed}
                  drink={item.drink}
                />
              )}
            />
          </SafeAreaView>
          <Button onPress={handleSubmit} title="Save" color="green" />
        </ScrollView>
      </View>
    )}
  </Formik>
);

export default Form;

export const displayData = async () => {
  let objects = null;
  try {
    let keys = null;
    try {
      keys = await AsyncStorage.getAllKeys();
      objects = await AsyncStorage.multiGet(keys);
      return objects;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const styles = StyleSheet.create({
  listItem: {
    fontSize: 20
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
