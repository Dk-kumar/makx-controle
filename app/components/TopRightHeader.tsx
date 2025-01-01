import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSwitchRoute } from './navigation/useSwitchRoute';
import { HoverableIcon } from './customicon/HoverableIcon';
import { MoreInfoHeader } from './showMoreInfoHeaderList';
import { usePageNameContext } from '../index';

export const TopRightHeader: React.FC = () => {
  const { motorData, setMotorData, userinfo } = usePageNameContext();
  const navigation = useSwitchRoute();

  const handleNotificationClick = () => {
    setMotorData({ ...motorData, unReadMessageCount: 0 });
  
    navigation.switchRoute("Notification");
  };

  const icons = [
    { element: <Feather name="home" size={24} />, route: 'Home' },
    {
      element: (
        <TouchableOpacity onPress={handleNotificationClick}>
          <View>
            <Ionicons name="notifications-outline" size={24} />
            {motorData.unReadMessageCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{motorData.unReadMessageCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
      route: 'Notification',
    },
  ];

  return (
    <View style={styles.childHeader}>
      {icons.map((icon, index) => (
        <HoverableIcon
          key={index}
          icon={icon.element}
          style={styles.icon}
          onPress={
            icon.route === 'Notification'
              ? handleNotificationClick
              : () => navigation.switchRoute(icon.route)
          }
        />
      ))}
      <MoreInfoHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
