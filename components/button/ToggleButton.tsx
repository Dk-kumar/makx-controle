// ToggleButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ToggleButtonProps {
  option1: string;
  option2: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ option1, option2 }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <TouchableOpacity 
      style={[styles.button, isToggled ? styles.buttonToggled : styles.buttonUntoggled]} 
      onPress={handleToggle}
    >
      <Text style={[styles.text, isToggled ? styles.textToggled : styles.textUntoggled]}>
        {isToggled ? option1 : option2}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonToggled: {
    backgroundColor: 'green',
  },
  buttonUntoggled: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontSize: 16,
  },
  textToggled: {
    color: 'white',
  },
  textUntoggled: {
    color: 'black',
  },
});

export default ToggleButton;