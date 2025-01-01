import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ControlButtons, SettingIndicator } from '@/app/components/homeComponent';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';
import { ToggleSwitch, ToggleChangeProps } from '@/app/components/button/ToggleSwitch';
import CircularTimer from '@/app/components/button/CircularTimer';
import { updateData } from "../utils/service";

import { usePageNameContext } from '@/app/index';

const HomeScreen = () => {
  const { userData, motorData, userinfo } = usePageNameContext();
  const { setTitle } = useSwitchRoute();
  
  useEffect(() =>{
    setTitle(userData.username);
  }, [userData]);
  if(!userData.username || !motorData)
  {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleToggleChange = (event: ToggleChangeProps) => {
    const { keyName, currentValue, isToggled } = event;
    
    updateData({
      motorid: userinfo.motorid,
      userid: userinfo.userid,
      data: {
        [keyName]: {
          defaultValue: currentValue,
          status: isToggled ? 'off' : 'on'
        }
      }
    });
  };

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
            <ToggleSwitch
              name="phasearms"
              option1={motorData.phasearms.option1}
              option2={motorData.phasearms.option2}
              defaultValue = {motorData.phasearms.currentValue === "option1" ? true : false}
              onChange={handleToggleChange}
            />
            <ToggleSwitch
              name="phaseenabled"
              option1={motorData.phaseenabled.option1}
              option2={motorData.phaseenabled.option2}
              defaultValue = {motorData.phaseenabled.currentValue === "option1" ? true : false}
              onChange={handleToggleChange}
            />
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
        <View style={[styles.statusBox, styles.yelloColor]}>
          <Text style={styles.label}>A1</Text>
          <Text style={styles.value}>{motorData.a1}</Text>
        </View>
        <View style={[styles.statusBox, styles.yelloColor]}>
          <Text style={styles.label}>A2</Text>
          <Text style={styles.value}>{motorData.a2}</Text>
        </View>
      </View>

      {/* Timers Section */}
      <View style={styles.timerRow}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>Cyclic Timer</Text>
          <ToggleSwitch 
            name="cyclictimer"
            option1={motorData.cyclictimer.option1}
            option2={motorData.cyclictimer.option2}
            defaultValue = {motorData.cyclictimer.currentValue === "option1" ? false : true}
            color1='#a6a6a6'
            color2='green'
            onChange={handleToggleChange}
          />
        </View>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>Run Timer</Text>
          <ToggleSwitch
            name="runtimer"
            option1={motorData.runtimer.option1}
            option2={motorData.runtimer.option2}
            defaultValue = {motorData.runtimer.currentValue === "option1" ? false : true}
            color1='#a6a6a6'
            color2='green'
            onChange={handleToggleChange}
          />
        </View>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>Dry Run Restart Timer</Text>
          <ToggleSwitch
            name="dryrunrestarttimer"
            option1={motorData.dryrunrestarttimer.option1}
            option2={motorData.dryrunrestarttimer.option2}
            defaultValue = {motorData.dryrunrestarttimer.currentValue === "option1" ? false : true}
            color1='#a6a6a6'
            color2='green'
            onChange={handleToggleChange}
          />
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
    padding: '2%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  yelloColor:{
    backgroundColor: "#e68a00"
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    padding: '2%',
    alignItems: 'center',
  },
  
  phaseSection: {
    alignItems: 'center',
    backgroundColor: '#00b3b3',
    padding: '5%',
    borderRadius: 5,
    width: '30%',
  },
  phaseText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  phaseNumber: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '2%',
    flexWrap: 'wrap',
  },
  
  statusBox: {
    alignItems: 'center',
    padding: '5%',
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#3465c5',
    color: "#ffffff",
    borderRadius: 10
  },
  label: {
    fontSize: 18,
    color: "#ffffff"
  },
  value: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: 'bold'
  },
  timerRow: {
    flexDirection: 'row',
    padding: 1,
    justifyContent: 'space-between',
    paddingVertical: '2%',
    flexWrap: 'wrap'
  },
  timerBox: {
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 10,
    height: 100,
    width: "33.33%"
  },
  
  timerText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    height: "40%"
  },
  circularTimer: {
    flexDirection: 'row',
    marginTop: -15,
    justifyContent: 'space-around',
  },
  footer: {
    position: 'absolute',
    left: '5%',
    right: '5%',
    bottom: '2%',
    borderRadius: 10,
    paddingVertical: '5%',
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomeScreen;