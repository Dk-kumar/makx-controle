import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const MotorRunningTime = () => {
  return (
    <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.text}>Motor Running Time 000:00:00</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
