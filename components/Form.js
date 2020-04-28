import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TextInput, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Formik } from 'formik';
import Moment from 'moment'

const Form = props => (
  <Formik
    initialValues={{ title : '' , date: Moment(), totalAmount: 0, people: [ {name: "name", amount: 0, isVegan: false, contributed: false} ] }}
    onSubmit={props.onSubmitForm}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          placeholder="Title"
          onChangeText={handleChange('title')}
          onBlur={handleBlur('title')}
          value={values.title}
          title={values.title}
        />
        <DatePicker
          placeholder="Date"
          onChangeText={handleChange('date')}
          onBlur={handleBlur('date')}
          date={values.date}
          mode="date"
          onDateChange={handleChange('date')}
        />
        <Button onPress={handleSubmit} title="Save" />
      </View>
    )}
  </Formik>
);

export default Form

export const displayData = async () => {
  let objects = null;
  try {
    let keys = null;
    try {
      keys = await AsyncStorage.getAllKeys();
      objects = await AsyncStorage.multiGet(keys);
    }
    catch(error) {
      console.log(error)
    }
  } 
    catch (error) {
    console.log(error);
  }
}