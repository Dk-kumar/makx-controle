import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Modal, TextInput, TouchableOpacity } from 'react-native';
import { InputBox } from '@/app/components/input/InputBox';
import { Button } from '@/app/components/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';
import { usePageNameContext } from '@/app/index';
import { requestSignIn } from '@/app/utils/service';

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    activationCode: '',
  });

  const [otpInfo, setOtpInfo] = useState({
    otp:'',
    originalOtp:'',
    isShowOtp: false,
  })

  const [submitState, setSubmitState] = useState("Send OTP");

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

  const handleOtpInputChange = (field: string, value: any) => {
    setOtpInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    if(otpInfo.otp == otpInfo.originalOtp) {
      switchRoute('Home');
      return;
    }
     Alert.alert('Error', 'Invalid OTP.');
     setLoading(false);
  }

  const handleSignIn = async () => {
    const { phoneNumber, activationCode } = formData;

    if(!phoneNumber) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    setSubmitState("Sending OTP......");

    try {
      const data = { phonenumber: phoneNumber };
      const response = await requestSignIn(data);

      const { isSuccess = false, username = '', userid = '', motorid = '', otp } = response.data || {};
      console.log(response);
      if(!isSuccess){
        const { error } = response.data || { error: {message: "Please try again after!!!"}}
        setSubmitState("Send OTP");
        return Alert.alert('Error', error.message);
      }
      setUserInfo({ userid, motorid });
      setOtpInfo((prev) => ({...prev, isShowOtp: true, originalOtp: otp}));
      setSubmitState("Send OTP");
    }
    catch(error) {
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
    <Text style={styles.headerText}>Agro Tech</Text>

    <View style={styles.imageContainer}>
      <FontAwesome name="user-circle-o" size={100} color="black" />
    </View>

    <InputBox
      label="Phone Number"
      placeholder="Enter your phone number"
      keyboardType="phone-pad"
      defaultValue={formData.phoneNumber}
      onChangeText={(text) => handleInputChange('phoneNumber', text)}
      required
    />
    {/* <InputBox
      label="Activation Code (IMEI)"
      placeholder="Enter your activation code"
      defaultValue={formData.activationCode}
      onChangeText={(text) => handleInputChange('activationCode', text)}
      required
    /> */}

    <Button
      label={submitState}
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
    <Modal
        visible={otpInfo.isShowOtp}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <TextInput
              style={styles.otpInput}
              placeholder="Enter 4-digit OTP"
              keyboardType="numeric"
              value={otpInfo.otp}
              onChangeText={(otp) => handleOtpInputChange("otp", otp)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.verifyBtn} onPress={() => handleVerifyOtp()}>
                <Text style={styles.verifyText}>Verify</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleOtpInputChange("isShowOtp", false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  </View>
);
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalBox: { width: 300, backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  otpInput: { borderWidth: 1, borderColor: '#aaa', borderRadius: 5, width: '80%', padding: 10, marginVertical: 10, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 10 },
  verifyBtn: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, flex: 1, marginRight: 5 },
  cancelBtn: { backgroundColor: '#f44336', padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 },
  verifyText: { color: 'white', textAlign: 'center' },
  cancelText: { color: 'white', textAlign: 'center' },
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