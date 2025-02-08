import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import PushNotification from "react-native-push-notification";

const triggerNotification = (message:string) => {
  PushNotification.localNotification({
    title: "Notification Title",
    message: message,
    playSound: true,
    soundName: "default",
    importance: "high",
  });
};

const NotificationPreview = (message:string) => {
  triggerNotification(message);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const translateY = new Animated.Value(-100);

  const onNotificationReceived = (message: string) => {
    setNotificationMessage(message);
    setIsVisible(true);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        setNotificationMessage(null);
      });
    }, 3000);
  };

  const simulateNotification = () => {
    onNotificationReceived("This is a sample notification preview message!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={simulateNotification} style={styles.button}>
        <Text style={styles.buttonText}>Simulate Notification</Text>
      </TouchableOpacity>

      {isVisible && (
        <Animated.View
          style={[
            styles.banner,
            { transform: [{ translateY }] }
          ]}
        >
          <Text style={styles.bannerText}>{notificationMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  bannerText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default NotificationPreview;
