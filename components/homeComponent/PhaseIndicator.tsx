import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PhaseIndicator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.phaseText}>PHASE</Text>
      <Text style={styles.phaseNumber}>1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17a2b8',
    padding: 19,
    borderRadius: 5
  },
  phaseText: {
    color: '#fff',
    fontSize: 16
  },
  phaseNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
});
