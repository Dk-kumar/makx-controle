import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePageNameContext } from '@/app/index';

const Profile: React.FC = () => {
  // Access user data from context
  const { userData } = usePageNameContext();

  // Ensure userData and username exist before rendering
  return (
    <View style={styles.container}>
      {userData?.username ? (
        <Text style={styles.usernameText}>Username: {userData.username}</Text>
      ) : (
        <Text style={styles.noUsernameText}>Username not available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noUsernameText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Profile;
