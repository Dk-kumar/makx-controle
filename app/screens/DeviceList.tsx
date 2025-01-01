import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePageNameContext } from '@/app/index';

type DeviceProps = {
  motorId: string;
  motorName: string;
};

const DeviceInfo: React.FC<DeviceProps> = ({ motorId, motorName }) => {
  return (
    <View style={styles.deviceInfo}>
      <View style={styles.deviceIndicatorContainer}>
        <FontAwesome name="circle" size={24} color="green" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.deviceInfoHeader}>{motorName}</Text>
        <Text style={styles.motorNumber}>{motorId}</Text>
        <View style={styles.bottomInfo}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="engine" size={15} color="white" />
          </View>
          <View style={styles.motorBottomInfoTextContainer}>
            <Text style={{ color: '#964B00' }}>P:3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const DeviceList: React.FC = () => {
  const { userData } = usePageNameContext();
  const devices = userData.devices;
  console.log(devices);
  Object.entries(devices).map(([motorId, motorName]) => {
    console.log(motorId, motorName);
  });

  return (
    <View style={styles.parentContainer}>
      {Object.entries(devices).map(([motorId, motorName]) => (
        <DeviceInfo key={motorId} motorId={motorId} motorName={motorName} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  deviceInfo: {
    width: '97%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.9,
    borderColor: 'lightgray',
    backgroundColor: '#e8ecfc',
    borderRadius: 9,
    marginTop: 5,
  },
  deviceIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  deviceInfoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066b2',
    marginBottom: 5,
  },
  motorNumber: {
    color: '#964B00',
  },
  iconCircle: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  motorBottomInfoTextContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#ffcccc',
    color: '#964B00',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DeviceList;
