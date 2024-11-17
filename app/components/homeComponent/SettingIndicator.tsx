import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HoverableIcon } from '../customicon/HoverableIcon';
import { DropdownMenu } from '../dropdown/DropdownMenu';
import { useSwitchRoute } from '../navigation/useSwitchRoute';
import { format } from 'date-fns';


interface SettingIndicator {
  customStyleSetting ?: ViewStyle,
  customStyleDropDown ?: ViewStyle
}

export const SettingIndicator : React.FC <SettingIndicator> = ({ customStyleSetting, customStyleDropDown = {}}) => {
  
  const navigation = useSwitchRoute();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (route: string) =>{
    setDropdownVisible(false);
    navigation.switchRoute(route);
  };

  const options = [
    { label: 'Amps & Volts', route: 'Amps & Volts' },
    { label: 'Timer', route: 'Timer' },
    { label: 'Notification', route: 'Notification' }
  ];

  const dropDownPosition = {
    x: 20,
    y: 50,
    height: 90
  }

  return (
    <View style={[styles.container, customStyleSetting]}>
      <TouchableOpacity style={styles.iconContainer}>
        <HoverableIcon
          icon={ <Ionicons name="settings" color="black" /> }
          onPress={() => setDropdownVisible(!isDropdownVisible)}
        />
      </TouchableOpacity>
      {isDropdownVisible && (
        <DropdownMenu 
          options={options}
          onSelect={handleSelect}
          onClose={() => setDropdownVisible(false)}
          anchorPosition = {dropDownPosition}
        />
      )}
      <Text>{format(date, 'yyyy-MM-dd HH:mm:ss a')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 7,
    // marginTop: 5,
    position: 'relative',
    zIndex: 100
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  }
});