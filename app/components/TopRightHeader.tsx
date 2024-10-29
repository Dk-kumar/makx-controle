import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSwitchRoute } from './navigation/useSwitchRoute';
import { HoverableIcon } from './customicon/HoverableIcon';

export const TopRightHeader : React.FC = () => {
  const navigation = useSwitchRoute();
  const icons = [
    { element: <Feather name= "home" />, route: "Home" },
    { element: <Ionicons name= "notifications-outline" />, route: "Notification" }
  ]

  return (
    <View style={styles.header}>
      <View style={styles.childHeader}>
        {
          icons.map((icon, index) => (
            <HoverableIcon
              key= {index}
              icon = {icon.element}
              style= {styles.icon}
              onPress= {() => navigation.switchRoute(icon.route)}
            />
          ))
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginTop: -5
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon:{
    marginHorizontal: 5
  }
});
