import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from '../button/ToggleSwitch';

interface BoxBottomProps {
  children ?: React.ReactNode;
  label ?: string;
  isLabelBottomSwitch ?: boolean
}

export const BoxBottom: React.FC<BoxBottomProps> = ({ children, label, isLabelBottomSwitch = false }) => {
  return(
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
  );
};

const styles = StyleSheet.create({
    boxTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: 3,
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
        width: 71,
        height: 30,
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
        padding: 5,
        position: 'relative',
    }
});