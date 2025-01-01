import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

interface DropdownMenuProps {
  options: { label: string; route: string, isSignout ?: boolean }[];
  onSelect ?: (route: string, isSignout?:boolean) => void;
  customStyle?: { dropdown?: object; dropdownItem?: object };
  onClose: () => void;
  anchorPosition?: { x: number; y: number; height: number };
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  customStyle,
  onSelect,
  onClose,
  anchorPosition,
}) => {
  const [adjustedPosition, setAdjustedPosition] = useState({
    x: 0,
    y: 0,
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
  });

  useEffect(() => {
    if(anchorPosition) {
      const { x, y, height } = anchorPosition;
      const screenWidth = Dimensions.get('window').width;
      const screenHeight = Dimensions.get('window').height;

      const dropdownWidth = 200;
      const dropdownHeight = options.length * 50;

      let adjustedX = x;
      let adjustedY = y + height;

      if(x + dropdownWidth > screenWidth) {
        adjustedX = screenWidth - dropdownWidth - 10;
      }

      if(adjustedY + dropdownHeight > screenHeight){
        adjustedY = y - dropdownHeight - 10;
      }

      setAdjustedPosition({ x: adjustedX, y: adjustedY, maxWidth: screenWidth, maxHeight: screenHeight });
    }
  }, [anchorPosition]);

  return (
    <Modal transparent={true} onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles.dropdown,
            {
              top: adjustedPosition.y,
              left: adjustedPosition.x,
              width: 200,
            },
            customStyle?.dropdown,
          ]}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onClose();
                onSelect && onSelect(option?.route, option?.isSignout);
              }}
              style={[styles.dropdownItem, customStyle?.dropdownItem]}
            >
              <Text style={styles.dropdownItemText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
});
