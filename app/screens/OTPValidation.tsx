import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { InputBox } from '@/app/components/input/InputBox';
import { Button } from '@/app/components/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { requestValidateOTP } from '@/app/utils/service';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/components/navigation/HookStackParamList';

type OTPValidationRouteProp = RouteProp<RootStackParamList, 'OTPValidation'>;

const OTPValidation: React.FC = () => {
    const route = useRoute<OTPValidationRouteProp>();
    const { email, phone_number}:any = route.params;

    const [emailOTP, setEmailOTP] = useState('');
    const [phoneOTP, setPhoneOTP] = useState('');
    const { switchRoute } = useSwitchRoute();

    const handleOTPValidate = () => {
        if(!emailOTP || !phoneOTP)
          {
            return Alert.alert('Error', 'Please fill the otp fields');
          }
      
          const data = {
            email: email,
            email_otp: emailOTP,
            phonenumber: phone_number,
            phone_otp: phoneOTP
          };
          
          requestValidateOTP(data).then(res =>{
            // const resData = res;
            // if(!resData || !resData.isSuccess || !resData.message)
            // {
            //   Alert.alert('Error', resData.message);
            //   return null;
            // }
    
            Alert.alert('Success', 'OTP Validated Successfully, kindly signin to continue');
            return switchRoute("Signin");
    
          }).catch(error =>{
            Alert.alert('Error', 'Something went wrong, please try again later');
          });
      };

    const handleCancel = () =>{
        return switchRoute("Signup");
    }

    return(
        <View style={styles.container}>
        <View style={styles.imageContainer}>
            <FontAwesome name="user-circle-o" size={100} color="black" style={styles.userImage} />
        </View>
        <InputBox
            label="Email Otp"
            placeholder="Enter your mail otp"
            defaultValue={emailOTP}
            onChangeText={setEmailOTP}
            required={true}
        />
        <InputBox
            label="Phone OTP"
            placeholder="Enter your phone otp"
            defaultValue={phoneOTP}
            onChangeText={setPhoneOTP}
            required={true}
        />
        <Button
            label="Submit"
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            onPress={handleOTPValidate}
        />
        <Button
            label="Cancel"
            buttonStyle={styles.buttonCancelContainer}
            textStyle={styles.buttonText}
            onPress={handleCancel}
        />
        </View>
    );
}


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
  buttonCancelContainer: {
    backgroundColor: '#ff0000',
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
  signInSection: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  signInPrompt: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  signInContainer: {
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
  signInText: {
    fontSize: 16,
    color: '#003cb3',
    fontWeight: 'bold',
  }
});

export default OTPValidation;