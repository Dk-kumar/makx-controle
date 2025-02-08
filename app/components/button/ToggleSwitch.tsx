import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, LayoutChangeEvent } from 'react-native';

export interface ToggleChangeProps {
  keyName: string,
  currentValue: string,
  isToggled: boolean
}
interface ToggleSwitchProps {
  name : string;
  option1: string;
  option2: string;
  color1 ?: string;
  color2 ?: string;
  switchStyle ?: object;
  toggleButtonStyle ?: object;
  defaultValue ?: boolean;
  onChange: (event: ToggleChangeProps) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (
  {
    name,
    option1,
    option2,
    color1 = 'green',
    color2 = 'green',
    switchStyle,
    toggleButtonStyle,
    defaultValue = false,
    onChange
  }) => {
  const [isToggled, setIsToggled] = useState(defaultValue);
  const [togglePosition] = useState(new Animated.Value(0));
  const [switchDimensions, setSwitchDimensions] = useState({ width: 0, height: 0 });
  const handleToggle = () => {
    setIsToggled(!isToggled);
    onChange({keyName:name, currentValue: isToggled ? "option2" : "option1", isToggled: isToggled});
    Animated.timing(togglePosition, {
      toValue: isToggled ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const animateToggle = (value: boolean) => {
    Animated.timing(togglePosition, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() =>{
    animateToggle(defaultValue);
    setIsToggled(defaultValue)
    return () => setIsToggled(defaultValue);
  },[defaultValue]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSwitchDimensions({ width, height });
  };

  const toggleStyles = {
    transform: [
      {
        translateX: togglePosition.interpolate({
          inputRange: [0, 1],
          outputRange: [3, switchDimensions.width - switchDimensions.height+5],
        }),
      },
    ],
  };

  const backgroundColor = isToggled ? color2 : color1;
  const textStyle = {
    fontSize: (switchDimensions.height <= 0 ? 0.5 : switchDimensions.height) * 0.35
  };
  const dynamicToggleButtonStyle = {
    width:  switchDimensions.height * 0.6,
    height: switchDimensions.height * 0.7,
    borderRadius: switchDimensions.height * 0.5,
  };

  return (
    <TouchableOpacity
      style={[styles.switchContainer, switchStyle, { backgroundColor}]}
      onPress={handleToggle}
      onLayout={handleLayout}
    >
      <Text style={[styles.toggleText, textStyle]}>
        {isToggled ? option1 : option2}
      </Text>
      <Animated.View style={[styles.toggleButton, toggleButtonStyle, dynamicToggleButtonStyle, toggleStyles]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    fontSize:16,
    borderRadius: 10,
    marginBottom: 10,
    width: 100,
    height: 30,
    justifyContent: 'center',
    padding: 5,
    position: 'relative',
  },
  toggleButton: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 5,
  },
  toggleText: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    marginLeft: 1,
  },
});