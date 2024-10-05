import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import ToggleSwitch from '../button/ToggleSwitch';

interface TimerDisplayProps {
    label: string;
    value: any;
}

export const Timer: React.FC<TimerDisplayProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} />
    </View>
  );
};

export const Timers = () => {
  return (
    <View style={styles.timerContainer}>
      <Timer label="Cyclic Timer" value={false} />
      <Timer label="Run Timer" value={true} />
      <Timer label="Dry Run Restart Timer" value={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    width: 55,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});