import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { InputBox } from '@/app/components/input/InputBox';
import { Button } from '@/app/components/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';
import { usePageNameContext } from '@/app/index';

import { requestSignIn } from '@/app/utils/service';

const Signin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activationCode, setActivationCode] = useState('');

  const { switchRoute, setTitle } = useSwitchRoute();
  const { setUserInfo } = usePageNameContext();

  const handleSignUp = () => {
    switchRoute("Signup");
    setTitle("Sign Up");
  };

  const handleSignIn = () => {
    if(!username || !phoneNumber || !activationCode)
    {
      return Alert.alert('Error', 'Please fill in all required fields.');
    }

    const data = {
      username: username,
      phonenumber: phoneNumber,
      activationcode: activationCode
    };
    requestSignIn(data).then(res => {
      const { isSuccess = false, userid="", motorid="" } = res.data;
      if(!isSuccess)
      {
        Alert.alert('Error', 'Invalid Crendentials');
        return null;
      }
      setUserInfo({userid, motorid });
      return switchRoute("Home");
    }).catch(error => {
      Alert.alert('Error', 'Something went wrong, please try again later '+ error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>MakxControle</Text>
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
        label="Sign In"
        buttonStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={handleSignIn}
      />
      <View style={styles.signUpSection}>
        <Text style={styles.signUpPrompt}>Don't have an account?</Text>
        <Button
          label="Sign Up"
          buttonStyle={styles.signUpContainer}
          textStyle={styles.signUpText}
          onPress={handleSignUp}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpSection: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  signUpPrompt: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  signUpContainer: {
    backgroundColor: 'transparent',
    width: '65%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#003cb3',
    borderRadius: 9,
    padding: 9
  },
  signUpText: {
    fontSize: 16,
    color: '#003cb3',
    fontWeight: 'bold',
  }
});
export default Signin;