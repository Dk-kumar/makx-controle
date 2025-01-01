import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { InputBox } from '@/app/components/input/InputBox';
import { Button } from '@/app/components/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';
import { usePageNameContext } from '@/app/index';
import { requestSignIn } from '@/app/utils/service';

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    activationCode: '',
  });

  const { switchRoute, setTitle } = useSwitchRoute();
  const { setUserInfo } = usePageNameContext();
   const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    switchRoute('Signup');
    setTitle('Sign Up');
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { username, phoneNumber, activationCode } = formData;

    if (!username || !phoneNumber || !activationCode) {
      return Alert.alert('Error', 'All fields are required.');
    }

    try {
      const data = { username, phonenumber: phoneNumber, activationcode: activationCode };
      const response = await requestSignIn(data);

      const { isSuccess = false, userid = '', motorid = '' } = response.data || {};
      if(!isSuccess){
        return Alert.alert('Error', 'Invalid credentials.');
      }
      setUserInfo({ userid, motorid });
      switchRoute('Home');
    } catch(error) {
      Alert.alert('Error', `An error occurred. Please try again later. \nDetails: ${error}`);
    }
    finally{
      setLoading(false);
    }
  };

  if(loading){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>MakxControle</Text>

      <View style={styles.imageContainer}>
        <FontAwesome name="user-circle-o" size={100} color="black" />
      </View>

      <InputBox
        label="Username"
        placeholder="Enter your username"
        defaultValue={formData.username}
        onChangeText={(text) => handleInputChange('username', text)}
        required
      />
      <InputBox
        label="Phone Number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        defaultValue={formData.phoneNumber}
        onChangeText={(text) => handleInputChange('phoneNumber', text)}
        required
      />
      <InputBox
        label="Activation Code (IMEI)"
        placeholder="Enter your activation code"
        defaultValue={formData.activationCode}
        onChangeText={(text) => handleInputChange('activationCode', text)}
        required
      />

      <Button
        label="Sign In"
        buttonStyle={styles.primaryButton}
        textStyle={styles.buttonText}
        onPress={handleSignIn}
      />

      <View style={styles.signUpSection}>
        <Text style={styles.signUpPrompt}>Don't have an account?</Text>
        <Button
          label="Sign Up"
          buttonStyle={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
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
  primaryButton: {
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
  secondaryButton: {
    backgroundColor: 'transparent',
    width: '65%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#003cb3',
    borderRadius: 9,
    padding: 9,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#003cb3',
    fontWeight: 'bold',
  },
});

export default Signin;