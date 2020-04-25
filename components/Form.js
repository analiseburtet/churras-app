import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TextInput, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Formik } from 'formik';

const Form = props => (
  <Formik
    initialValues={{ events: { title : '' , date:"2020-05-15", totalAmount: 0, people: [ {name: "name", amount: 0, isVegan: false, contributed: false} ] } }}
    onSubmit={(values) => {
      AsyncStorage.setItem("event", JSON.stringify(values))
    }}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          placeholder="Title"
          onChangeText={handleChange('title')}
          onBlur={handleBlur('title')}
          value={values.title}
        />
        <DatePicker
          placeholder="Date"
          onChangeText={handleChange('date')}
          onBlur={handleBlur('date')}
          date={values.date}
          mode="date"
          onDateChange={handleChange('date')}
        />
        <Button onPress={displayData} title="Show" />
        <Button onPress={handleSubmit} title="Save" />
      </View>
    )}
  </Formik>
);

export default Form

const displayData = async () => {
  try {
    let event = await AsyncStorage.getItem('event')
    let parsed = JSON.parse(event)
    alert(parsed.title)
  }
  catch(error) {
    alert(error)
  }
}