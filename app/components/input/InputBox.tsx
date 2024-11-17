import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface InputBoxProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  defaultValue1?: string;
  smallText?: string;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  smallTextStyle?: TextStyle;
  isSecondInputNeeded?: boolean;
  required?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad' | 'url' | 'ascii-capable';
  errorMessage?: string;
  onChangeText?: (text: string) => void;
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
  smallTextStyle,
  keyboardType = "default",
  required = false,
  errorMessage = 'This field is required.',
  onChangeText
}) => {
  const [value, setValue] = useState(defaultValue);
  const [value1, setValue1] = useState(defaultValue1);
  const [isError, setIsError] = useState(false);

  const handleTextChange = (text: string) => {
    setValue(text);
    if(onChangeText){
      onChangeText(text);
    }
  };

  const validateInput = () => {
    if(required && !value.trim()){
      setIsError(true);
    }
    else{
      setIsError(false);
    }
  };

  return (
    <View style={[styles.container, inputContainerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, isError ? styles.inputError : null, inputStyle]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={handleTextChange}
          onBlur={validateInput}
        />
        {isSecondInputNeeded && (
          <>
            <Text style={styles.separator}>.</Text>
            <TextInput
              style={[styles.input, inputStyle]}
              placeholder={placeholder}
              value={value1}
              onChangeText={setValue1}
            />
          </>
        )}
      </View>
      {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
      {smallText && <Text style={[styles.smallText, smallTextStyle]}>{smallText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 47,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  separator: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#333',
  },
  smallText: {
    fontSize: 12,
    marginTop: 5,
    color: '#777',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
  },
});