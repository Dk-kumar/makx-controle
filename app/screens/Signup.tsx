import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InputBox } from '@/app/components/input/InputBox';
import { Button } from '@/app/components/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activationCode, setActivationCode] = useState('');

  const handleSignIn = () => {
    console.log('Sign up pressed with:', { username, phoneNumber, activationCode });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FontAwesome name="user-circle-o" size={100} color="black" style={styles.userImage} />
      </View>
      <InputBox
        label="Username"
        placeholder="Enter your username"
        defaultValue={username}
        onChangeText={setUsername}
        required={true}
      />
      <InputBox
        label="Email Id"
        placeholder="Enter your email"
        defaultValue={email}
        onChangeText={setEmail}
        required={true}
      />
      <InputBox
        label="Phone Number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        defaultValue={phoneNumber}
        onChangeText={setPhoneNumber}
        required={true}
      />
      <InputBox
        label="Activation Code (IMEI)"
        placeholder="Enter your activation code"
        defaultValue={activationCode}
        onChangeText={setActivationCode}
        required={true}
      />
      <Button
        label="Sign Up"
        buttonStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={handleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '15%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d3d3d3',
  },
  buttonContainer: {
    backgroundColor: '#003cb3',
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    marginTop: 20,
    padding: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});