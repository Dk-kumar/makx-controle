import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from '../button/ToggleSwitch';

interface BoxTopProps {
  children ?: React.ReactNode;
  label : string;
  isLabelSwitch ?: boolean;
  switchOnColor ?: string;
  switchOffColor ?: string;
  option1 ?: string;
  option2 ?: string;
  toggleSwitchWidth ?: number;
  switchStyle ?: object;
  isLabelBottomSwitch ?: boolean;
}

export const BoxTop: React.FC<BoxTopProps> = ({ 
  children,
  label,
  switchOffColor="gray",
  switchOnColor="green",
  isLabelSwitch = true,
  option1="OFF",
  option2="ON",
  switchStyle = styles.toggleSwitch,
  isLabelBottomSwitch = false
}) => {
  return(
    <View style={styles.boxTop}>
        <View style={styles.topContainer}>
          <Text style={styles.label}>{label}</Text>
          {isLabelSwitch && 
          <ToggleSwitch
              option1={option1} color1={switchOffColor}
              option2={option2} color2={switchOnColor}
              switchStyle = { switchStyle }
              defaultValue = {true}
          />}
        </View>
        <View style={styles.boxTop}>
          <View style={styles.topContainer}>
            <Text style={styles.label}>{label}</Text>
            {isLabelBottomSwitch && 
            <ToggleSwitch
                option1="OFF" color1="gray"
                option2="ON" color2="green"
                switchStyle = { styles.toggleSwitch }
            />}
          </View>
          { children }
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    boxTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 5,
    },
    topContainer:{
      flexDirection: 'row',
    },
    label:{
        fontSize: 17,
        fontWeight: '900',
        marginRight: 10,
        marginVertical: 2
    },
    toggleSwitch:{
        width: 65,
        height: 30,
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
        padding: 5,
        position: 'relative',
    },
    switchStyle:{
        borderRadius: 20,
        marginBottom: 10,
        width: 110,
        height: 35,
        justifyContent: 'flex-end',
        padding: 5
    }
});