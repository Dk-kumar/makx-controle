import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
  backgroundColor?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  color = 'white',
  backgroundColor = '#0000ff',
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color }, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});