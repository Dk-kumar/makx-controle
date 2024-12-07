import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { useSwitchRoute } from '../navigation/useSwitchRoute';

type RootStackParamList = {
    [key: string]: undefined;
};
  
type NavigationProp = StackNavigationProp<RootStackParamList>;
  
const TopBackButton: React.FC= () => {
    const { switchBack } = useSwitchRoute();
    const opacity = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        try{
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            switchBack();
            Animated.timing(opacity, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }).start();
          });
        }
        catch(err){}
    };
  
    return(
        <Animated.View style={{ opacity }}>
            <TouchableOpacity style={styles.button}
                activeOpacity={1}
                onPress={handlePress}>
                <AntDesign name="arrowleft" size={22} style={styles.buttonIcon}/>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
      padding: 10,
      backgroundColor: '#2196F3',
      borderRadius: 5,
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonIcon: {
      color: 'white'
    },
});

export default TopBackButton;