import * as React from 'react';
import * as Yup from 'yup';
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
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Formik } from 'formik';
import Moment from 'moment';

function Item({ name, amount, isVegan, contributed, drink }) {
  return (
    <View>
      <CheckBox
        value={contributed}
        onValueChange={!contributed}
        style={styles.listItem}
      />
      <Text style={styles.listItem}>{name}</Text>
      <Text style={styles.listItem}>$ {amount}</Text>
      <CheckBox
        value={isVegan}
        onValueChange={!isVegan}
        style={styles.listItem}
      />
      <CheckBox value={drink} onValueChange={!drink} style={styles.listItem} />
    </View>
  );
}

const Form = props => (
  <Formik
    initialValues={{
      title: '',
      date: Moment(),
      suggestedPrice: 10,
      totalAmount: 0,
      people: [
        {
          name: 'Analise Burtet',
          amount: 20,
          isVegan: true,
          contributed: true,
          drink: true,
        },
      ],
    }}
    onSubmit={props.onSubmitForm}
    validationSchema={Yup.object().shape({
      title: Yup.string().required('Required field.'),
    })}>
    {({
      values,
      handleChange,
      errors,
      setFieldTouched,
      touched,
      isValid,
      handleSubmit,
      handleBlur,
    }) => (
      <View>
        <ScrollView>
          <View style={styles.rowView}>
            <TextInput
              style={{ height: 40, fontSize: 20 }}
              placeholder="Event's name"
              onChangeText={handleChange('title')}
              onBlur={() => setFieldTouched('title')}
              value={values.title}
              title={values.title}
            />
            {touched.title && errors.title && (
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.title}</Text>
            )}
            <DatePicker
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
              date={values.date}
              mode="date"
              onDateChange={handleChange('date')}
            />
          </View>
          <View style={styles.rowView}>
            <Image
              style={styles.listImage}
              source={require('../assets/money.png')}
            />
            <TextInput
              style={{ height: 40, fontSize: 20 }}
              placeholder="Suggested price $ 10,00"
              onChangeText={handleChange('suggestedPrice')}
              onBlur={() => setFieldTouched('suggestedPrice')}
              value={values.suggestedPrice}
              title={values.suggestedPrice}
            />
          </View>
          <View style={styles.guestBox}>
            <View style={styles.guestBoxLeft}>
              <Text style={styles.listItem}>
                <Image
                  style={styles.listImage}
                  source={require('../assets/paid.png')}
                />
              </Text>
              <Text style={styles.listItem}>
                <Image
                  style={styles.listImage}
                  source={require('../assets/people.png')}
                />
              </Text>
              <Text style={styles.listItem}>
                <Image
                  style={styles.listImage}
                  source={require('../assets/money.png')}
                />
              </Text>
              <Text style={styles.listItem}>
                <Image
                  style={styles.listImage}
                  source={require('../assets/vegetarian.png')}
                />
              </Text>
              <Text style={styles.listItem}>
                <Image
                  style={styles.listImage}
                  source={require('../assets/holding.png')}
                />
              </Text>
            </View>
            <View style={styles.guestBoxRight}>
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
            </View>
          </View>
          <View style={styles.guestBox}>
            <Button
              onPress={array => handleNewGuest(values.people)}
              title="Add guest"
            />
          </View>
          <Button onPress={handleSubmit} title="Save" />
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

const handleNewGuest = array => {
  array.push({
    name: 'Ana',
    amount: 10,
    isVegan: false,
    contributed: true,
    drink: true,
  });
  console.log(array)
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guestBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guestBoxLeft: {
    flexDirection: 'column',
  },
  guestBoxRight: {
    flexDirection: 'column',
  },
  listItem: {
    height: 35,
    margin: 5,
    fontSize: 20,
    alignItems: 'bottom',
  },
  listImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
});
