import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useSwitchRoute } from './navigation/useSwitchRoute';
import { HoverableIcon } from './customicon/HoverableIcon';
import { MoreInfoHeader } from './showMoreInfoHeaderList';

export const TopRightHeader : React.FC = () => {
  const navigation = useSwitchRoute();
  const icons = [
    { element: <Feather name= "home" />, route: "Home" },
    { element: <Ionicons name= "notifications-outline" />, route: "Notification" }
  ]

  return (
    <View style={styles.childHeader}>
      {
        icons.map((icon, index) => (
          <HoverableIcon
            key= { index }
            icon = { icon.element }
            style= { styles.icon }
            onPress= { () => navigation.switchRoute(icon.route) }
          />
        ))
      }
      <MoreInfoHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon:{
    marginHorizontal: 5
  }
});
