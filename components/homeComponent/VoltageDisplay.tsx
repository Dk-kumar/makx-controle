import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface VoltageDisplayProps {
    label: string;
    value: any;
}

export const VoltageDisplay : React.FC<VoltageDisplayProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}V</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  value: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
