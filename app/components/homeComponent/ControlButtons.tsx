import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { usePageNameContext } from '../../';
import { updateData } from '../../utils/service';

const ControlButtons = () => {
  const { motorData, userinfo } = usePageNameContext();
  const [isMotorOn, setIsMotorOn] = useState(motorData.status);

  const handleMotorToggle = (turnOn: boolean) => {
    console.log("updating motor status");
    updateData({
      motorid: userinfo.motorid,
      userid: userinfo.userid,
      data: {
        status: turnOn
      }
    });
    setIsMotorOn(turnOn);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isMotorOn && styles.disabled]}
        onPress={() => handleMotorToggle(true)}
        disabled={isMotorOn}
      >
        <FontAwesome name="power-off" size={30} color="green" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, !isMotorOn && styles.disabled]}
        onPress={() => handleMotorToggle(false)}
        disabled={!isMotorOn}
      >
        <FontAwesome name="power-off" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 15,
  },
  disabled: {
    opacity: 0.3,
  }
});
export default ControlButtons;