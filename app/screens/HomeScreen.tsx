import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ControlButtons, SettingIndicator } from '@/app/components/homeComponent';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';
import ToggleSwitch from '@/app/components/button/ToggleSwitch';
import CircularTimer from '@/app/components/button/CircularTimer';

import detailsContext from '@/app/hooks/FirebaseContext';

export const HomeScreen = () => {
  const [isEnabledCyclic, setIsEnabledCyclic] = useState(false);
  const [isEnabledRun, setIsEnabledRun] = useState(false);
  const [isEnabledDryRun, setIsEnabledDryRun] = useState(false);

  const { userData = {}, motorData = {} } = useContext(detailsContext);
  const { setTitle } = useSwitchRoute();

  
  useEffect(() =>{
    setTitle(userData.username);
  }, [userData]);

  console.log(motorData)



  const toggleCyclicSwitch = () => setIsEnabledCyclic(previousState => !previousState);
  const toggleRunSwitch = () => setIsEnabledRun(previousState => !previousState);
  const toggleDryRunSwitch = () => setIsEnabledDryRun(previousState => !previousState);

  return (
    <View style={styles.container}>
      {/* Header */}
      <SettingIndicator />

      {/* Phase Section */}
      <View style={styles.topContainer}>
        <View style={styles.phaseSection}>
          <Text style={styles.phaseText}>PHASE</Text>
          <Text style={styles.phaseNumber}>{motorData.phase}</Text>
        </View>

        {/* Controls */}

        {/* <View style={styles.controlsRow}> */}
        <View>
        <ControlButtons />

        </View>

          <View>
            <ToggleSwitch option1="3 PH" option2="1/3 PH" defaultValue = {true}/>
            <ToggleSwitch option1="AUTO" option2="MANUAL" defaultValue = {true} />
          </View>
        {/* </View> */}
      </View>
      

      {/* Voltage and Amperes Display */}
      <View style={styles.statusRow}>
        <View style={styles.statusBox}>
          <Text style={styles.label}>L1</Text>
          <Text style={styles.value}>{motorData.l1}</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.label}>L2</Text>
          <Text style={styles.value}>{motorData.l2}</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.label}>L3</Text>
          <Text style={styles.value}>{motorData.l3}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.statusBox}>
          <Text style={styles.label}>A1</Text>
          <Text style={styles.value}>{motorData.a1}</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.label}>A2</Text>
          <Text style={styles.value}>{motorData.a2}</Text>
        </View>
      </View>

      {/* Timers Section */}
      <View style={styles.timerRow}>
        <View style={styles.timerBox}>
          <Switch onValueChange={toggleCyclicSwitch} value={isEnabledCyclic} />
          <Text style={styles.timerText}>Cyclic Timer</Text>
        </View>

        <View style={styles.timerBox}>
          <Switch onValueChange={toggleRunSwitch} value={isEnabledRun} />
          <Text style={styles.timerText}>Run Timer</Text>
        </View>

        <View style={styles.timerBox}>
          <Switch onValueChange={toggleDryRunSwitch} value={isEnabledDryRun} />
          <Text style={styles.timerText}>Dry Run Restart Timer</Text>
        </View>
      </View>

      <View style={styles.circularTimer}>
        <CircularTimer label="OFF TIME" time="0000" offTime="0000" />
        <CircularTimer label="Time" time="0000" offTime="0000" />
        <CircularTimer label="Time" time="0000" offTime="0000" />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Motor Running Time 000:00:00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  topContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 24, 
    marginBottom: 40,
    alignItems: 'center',
  },
  
  phaseSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  phaseText: {
    fontSize: 18,
    fontWeight: 'bold', 
  },
  phaseNumber: {
    fontSize: 32,
    color: 'teal',
    fontWeight: 'bold',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statusBox: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e3e3e3',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  timerBox: {
    alignItems: 'center',
    padding: 10,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  circularTimer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },

  footer: {
    marginTop: 16,
    paddingVertical: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'white',
  },
});
