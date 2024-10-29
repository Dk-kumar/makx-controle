import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CircularTimerProps {
  label: string;
  time: string;
  offTime?: string;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ label, time, offTime }) => {
  return (
    <View style={styles.timerContainer}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <Text style={styles.timeText}>{time}</Text>
          {offTime && <Text style={styles.timeText}>{offTime}</Text>}
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
  },
  outerCircle: {
    width: 90,
    height: 90,
    borderRadius: 55,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  timeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CircularTimer;
