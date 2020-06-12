import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const Input = ({label, value, placeholder, secureTextEntry, onChangeText}) => {
  return (
    <View style={styles.container1}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.Input}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    marginTop: 10,
    width: '100%',
    borderColor: '#eee',
    borderBottomWidth: 2,
  },
  label: {
    padding: 5,
    color: '#333',
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
  },
  Input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#333',
    fontSize: 18,
    width: '100%',
  },
});
export default Input;
