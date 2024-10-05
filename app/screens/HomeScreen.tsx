import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SettingIndicator } from '@/components/homeComponent';
import { 
  PhaseIndicator, 
  ControlButtons, 
  VoltageDisplay, 
  CurrentDisplay, 
  Timers,
  MotorRunningTime 
} from '@/components/homeComponent';
import ToggleSwitch from '@/components/button/ToggleSwitch';
import CircularTimer from '@/components/button/CircularTimer';

import { useSwitchRoute } from '@/components/navigation/useSwitchRoute';

export const HomeScreen: React.FC = () => {
  const userName = "Deepan Kumar";
  const { setTitle } = useSwitchRoute();
  useEffect(() =>{
    setTitle(userName);
  }, [userName]);

  return (
    <View style={styles.container}>
      <SettingIndicator />
      <View style={styles.row}>
        <PhaseIndicator />
        <ControlButtons />
        <View>
          <ToggleSwitch option1="3 PH" option2="1/3 PH" defaultValue = {true}/>
          <ToggleSwitch option1="AUTO" option2="MANUAL" defaultValue = {true} />
        </View>
      </View>
      <View style={styles.row}>
        <VoltageDisplay label="L1" value="0" />
        <VoltageDisplay label="L2" value="0" />
        <VoltageDisplay label="L3" value="0" />
      </View>
      <View style={styles.row}>
        <CurrentDisplay label="A1" value="0.0" />
        <CurrentDisplay label="A2" value="0.0" />
      </View>
      <Timers />
      <View style={styles.row}>
        <CircularTimer label="OFF TIME" time="0000" offTime="0000" />
        <CircularTimer label="Time" time="0000" offTime="0000" />
        <CircularTimer label="Time" time="0000" offTime="0000" />
      </View>
      <MotorRunningTime />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -12,
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
});
