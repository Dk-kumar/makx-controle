import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle, TextInputProps } from 'react-native';

interface InputBoxProps {
  label : string;
  placeholder ?: string;
  defaultValue ?: string;
  defaultValue1 ?: string;
  smallText ?: string;
  labelStyle ?: TextStyle;
  inputStyle ?: TextInputProps;
  inputContainerStyle ?: ViewStyle;
  smallTextStyle ?: TextStyle;
  isSecondInputNeeded ?: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  placeholder = '',
  defaultValue = '',
  defaultValue1 = '0',
  smallText,
  labelStyle,
  inputStyle,
  isSecondInputNeeded,
  inputContainerStyle,
  smallTextStyle
}) => {
  const [value, setValue] = useState(defaultValue);
  const [value1, setValue1] = useState(defaultValue1);

  return (
    <View style={[styles.container, inputContainerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
      />
      {isSecondInputNeeded && 
      (<><Text>.</Text>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value1}
          onChangeText={setValue1}
        /></>)}
      {smallText ? <Text style={[styles.smallText, smallTextStyle]}> {smallText} </Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  label:{
    fontSize: 15,
    marginRight: 7,
    flexShrink: 1,
  },
  input:{
    width: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 7,
    fontSize: 16,
    color: 'blue'
  },
  smallText:{
    fontSize: 15,
  },
});
