import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform, NativeModules } from 'react-native';
import { usePageNameContext } from '@/app/index';
import PushNotification from 'react-native-push-notification';

const Notification: React.FC = () => {
  const { motorData, setMotorData } = usePageNameContext();

  const markAllAsRead = () => {
    setMotorData({ ...motorData, unReadMessageCount: 0 });
  };
  
  const triggerNotificationSound = () =>{
    PushNotification.localNotification({
      channelId: 'qJzAIcv03PyaWqxRgO4mSU3l',
      title: 'New Notification', 
      message: 'You have a new message', 
      playSound: true, 
      soundName: 'default',
    })
  };

  useEffect(() => {
    if(motorData.unReadMessageCount > 0) {
      triggerNotificationSound();
    }
  }, [motorData.unReadMessageCount]);
  console.log(motorData.notification[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Notifications ({motorData.unReadMessageCount} unread)
      </Text>

      <FlatList
        data={motorData.notification}
        keyExtractor={(item: any, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={markAllAsRead}>
            <View
              style={[
                styles.notificationItem,
                index < motorData.unReadMessageCount
                  ? styles.unread
                  : styles.read,
              ]}
            >
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  notificationItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  unread: {
    backgroundColor: '#e0f7fa',
    borderColor: '#4caf50',
  },
  read: {
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});
