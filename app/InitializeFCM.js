import { messaging } from '../config';

const requestUserPermission = async (userId) => {
  //console.log('Requesting notification permission...', userId);
  try {
    const authStatus = await messaging().requestPermission();
    //console.log('Auth status:', authStatus);

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      //console.log('Notification permissions granted');
      await getDeviceToken(userId);
    } else {
      console.warn('Notification permissions not granted');
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error.message || error);
  }
};

const getDeviceToken = async (userId) => {
  //console.log('Fetching FCM token...');
  try {
    const token = await messaging().getToken();

    if (token) {
      //console.log('Device FCM Token:', token);
      await sendTokenToServer(userId, token);
      return token;
    } else {
      console.warn('Failed to fetch FCM token');
    }
  } catch (error) {
    console.error('Error fetching FCM token:', error.message || error);
  }
};

const sendTokenToServer = async (userId, token) => {
  //console.log(`Sending token for userId: ${userId} to server...`);
  try {
    //console.log('Token sent to server successfully:', token);
  } catch (error) {
    console.error('Error sending token to server:', error.message || error);ac
  }
};

const InitializeFCM = async (userId) => {
  //console.log('Initializing FCM...');
  try {
    await requestUserPermission(userId);

    //console.log('Setting up token refresh listener...');
    messaging().onTokenRefresh(async (token) => {
      //console.log('FCM Token refreshed:', token);
      await sendTokenToServer(userId, token);
    });
  } catch (error) {
    console.error('Error initializing FCM:', error.message || error);
  }
};

export default InitializeFCM;
