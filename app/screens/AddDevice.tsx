import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { InputBox } from '@/app/components/input/InputBox';
import { Button } from '@/app/components/button/Button';

export const AddDevice: React.FC = () => {
  const [deviceName, setDeviceName] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [errors, setErrors] = useState({ deviceName: false, activationCode: false });

  const handleAddDevice = () => {
    const isDeviceNameValid = deviceName.trim() !== '';
    const isActivationCodeValid = activationCode.trim() !== '';
    
    setErrors({
      deviceName: !isDeviceNameValid,
      activationCode: !isActivationCodeValid,
    });

    if(isDeviceNameValid && isActivationCodeValid){
      console.log('Adding device:', { deviceName, activationCode });
      Alert.alert('Success', 'Device added successfully!');
    }
    else{
      Alert.alert('Error', 'Please fill in all required fields.');
    }
  };

  return (
    <View style={styles.container}>
      <InputBox
        label="Device Name"
        placeholder="Enter device name"
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        required={true}
        errorMessage="Device name is required."
        defaultValue={deviceName}
        onChangeText={setDeviceName}
      />
      <InputBox
        label="Activation Code(IMEI)"
        placeholder="Enter activation code"
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        required={true}
        errorMessage="Activation code is required."
        defaultValue={activationCode}
        onChangeText={setActivationCode}
      />
      <Button
        label="Add Device"
        backgroundColor="#003cb3"
        textStyle={styles.buttonTextStyle}
        onPress={handleAddDevice}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputStyle: {
    width: '100%',
    height: 47,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputContainerStyle: {
    marginBottom: 15,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
  },
});