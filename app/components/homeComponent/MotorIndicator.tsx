import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons }  from '@expo/vector-icons';

const MotorIndicator = () =>{
    return(
        <View>
            <MaterialCommunityIcons name="engine" size={24} color="black" />
        </View>
    )
}
export default MotorIndicator;