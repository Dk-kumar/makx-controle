import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from '../button/ToggleSwitch';


interface BoxProps{
    children ?: React.ReactNode;
    label : string;
    isLabelSwitch ?: boolean;
    switchOnColor ?: string;
    switchOffColor ?: string;
    option1 ?: string;
    option2 ?: string;
    toggleSwitchWidth ?: number;
    switchStyle ?: object;
    label1 ?: string;
    isLabelBottomSwitch ?: boolean
  }

export const Box: React.FC<BoxProps> = ({
    children,
    label,
    label1,
    switchOffColor="gray",
    switchOnColor="green",
    isLabelSwitch = true,
    option1="OFF",
    option2="ON",
    switchStyle = styles.toggleSwitch
}) => {
  return(
    <View style={styles.boxTop}>
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
    },
});