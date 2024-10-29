import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';

interface CustomSwitchProps{
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={false}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={30}
        barHeight={1}
        circleBorderWidth={0}
        backgroundActive={'green'}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}
        changeValueImmediately={true}
        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
        outerCircleStyle={{}}
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2}
        switchRightPx={2}
        switchWidthMultiplier={2}
        switchBorderRadius={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default CustomSwitch;
