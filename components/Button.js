import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export const Button = ({onPress, children}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.buttoni}>
        <Text style={styles.textdesign}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttoni: {
    marginTop: 10,
    padding: 20,
    width: '100%',
    backgroundColor: '#5353c6',
    borderRadius: 4,
    alignItems: 'center',
  },
  textdesign: {
    color: 'white',
    fontSize: 18,
  },
});
