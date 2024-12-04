import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ControlButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="power-off" size={30} color="green" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="power-off" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 15,
  },
});
export default ControlButtons;