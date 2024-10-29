import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';


interface DropdownMenu {
    options: { label: string; route: string }[];
    onSelect: (route: string) => void;
    customStyle ?: ViewStyle
    onClose: () => void;
}

export const DropdownMenu: React.FC<DropdownMenu> = ({ options, customStyle, onSelect, onClose }) => {
  return (
    <View style={[styles.dropdown, customStyle]}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(option.route)} style={styles.dropdownItem}>
          <Text style={styles.dropdownItemText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '50%'
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1000,
  },
  dropdownItemText: {
    fontSize: 16,
    zIndex: 1000,
  },
});