import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSwitchRoute } from './navigation/useSwitchRoute';
import { DropdownMenu } from './dropdown/DropdownMenu';

export const MoreInfoHeader: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number; height: number }>({
    x: 0,
    y: 0,
    height: 0,
  });
  const iconRef = useRef<TouchableOpacity>(null);
  const navigation = useSwitchRoute();

  const { width: screenWidth } = Dimensions.get('window');

  const handleSelect = (route: string) => {
    setDropdownVisible(false);
    navigation.switchRoute(route);
  };

  const options = [
    { label: 'Device List', route: 'DeviceList' },
    { label: 'Add Device', route: 'AddDevice' },
    { label: 'Profile', route: 'Profile' },
    { label: 'About', route: 'About' },
    { label: 'Signout', route: 'Signout' }
  ];

  const toggleDropdown = () => {
    iconRef.current?.measure(
      (x, y, width, height, pageX, pageY) => {
        const dropdownWidth = 200;
        const adjustedX = pageX + dropdownWidth > screenWidth
          ? screenWidth - dropdownWidth - 10
          : pageX;

        setAnchorPosition({
          x: adjustedX,
          y: pageY,
          height: height,
        });
        setDropdownVisible(!isDropdownVisible);
      }
    );
  };

  return (
    <View>
      <TouchableOpacity ref={iconRef} onPress={toggleDropdown}>
        <MaterialIcons name="more-vert" style={styles.icon} size={24} />
      </TouchableOpacity>
      {isDropdownVisible && (
        <DropdownMenu
          options={options}
          onSelect={handleSelect}
          onClose={() => setDropdownVisible(false)}
          anchorPosition={anchorPosition}
          customStyle={{
            dropdownItem: styles.dropdownItem,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 5,
  },
  dropdownItem: {
    borderBottomColor: '#fff',
  },
});