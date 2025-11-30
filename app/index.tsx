import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RouterConfig from './router/RouterConfig';
import { database } from '../config';
import { ref, onValue } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo, UserData, MotorData, resetMotorData } from './IndexInterFace';

interface UserContextType {
  userinfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  userData: UserData;
  motorData: MotorData;
  setMotorData : (info: MotorData) => void;
  removeSigninCredentials: () => Promise<void>;
}

const PageNameContext = createContext<UserContextType | null>(null);

export const usePageNameContext = () => {
  const context = useContext(PageNameContext);
  if (!context) {
    throw new Error('usePageNameContext must be used within a PageNameContext.Provider');
  }
  return context;
};

export default function Index() {
  const [userinfo, setUserInfo] = useState<UserInfo>({});
  const [userData, setUserData] = useState<any>({ username: '', phonenumber:''});
  const [motorData, setMotorData] = useState<MotorData>(resetMotorData);
  const [initialRoute, setInitialRoute] = useState('Signin');
  const [loading, setLoading] = useState(true);

  const removeSigninCredentials = async () => {
    try {
      await AsyncStorage.removeItem('userInfoData');
      console.log("Removed userInfoData from AsyncStorage.");
  
      setUserInfo({ userid: '', motorid: '' });
      setUserData({ username: '', phonenumber: '', devices: [] });
      setMotorData(resetMotorData);
  
      console.log("Reset local states.");
    } catch (error) {
      console.log('Error during sign out:', error);
    }
  };

  const contextValue = useMemo(
    () => ({
      userinfo,
      setUserInfo,
      userData,
      motorData,
      setMotorData,
      removeSigninCredentials,
    }),
    [userinfo, userData, motorData]
  );

  const saveToStorageIfChanged = async (key: string, data: object) => {
    try {
      const currentData = await AsyncStorage.getItem(key);
      if (currentData !== JSON.stringify(data)) {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      }
    } catch (error) {
      console.error(`Error saving ${key} to AsyncStorage:`, error);
    }
  };

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const userInfoData = await AsyncStorage.getItem('userInfoData');
        if(userInfoData){
          console.log("initial rendering userInfoData:", userInfoData);
          setUserInfo(JSON.parse(userInfoData));
          setInitialRoute('Home');
        }
        setLoading(false);
      } catch(error) {
        console.error('Error loading stored data:', error);
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const { userid, motorid } = userinfo;
    if(!userid || !motorid) return;

    saveToStorageIfChanged('userInfoData', userinfo);
    console.log(userid, motorid);

    const userRef = ref(database, `users/${userid}`);
    const motorRef = ref(database, `motors/${motorid}`);

    const unsubscribeUser = onValue(userRef, async (snapshot) => {
      const updatedUserData = snapshot.exists() ? snapshot.val() : {};
      setUserData(updatedUserData);
    });

    const unsubscribeMotor = onValue(motorRef, async (snapshot) => {
      const updatedMotorData = snapshot.exists() ? snapshot.val() : {};

      const previousNotifications = motorData.notification || [];
    
      const notificationsUpdated = JSON.stringify(previousNotifications) !== JSON.stringify(updatedMotorData.notification);
    
      if (notificationsUpdated) {
        let unReadMessageCount = motorData.unReadMessageCount;
        unReadMessageCount = updatedMotorData.notification.length - motorData.unReadMessageCount;
        
        unReadMessageCount = unReadMessageCount >= 50 ? 50 : unReadMessageCount;
        
        updatedMotorData.unReadMessageCount = unReadMessageCount+1;
      } else {
        console.log("No changes in notifications.");
      }
      setMotorData((prevData) => ({ ...updatedMotorData }));
    });

    return () => {
      unsubscribeUser();
      unsubscribeMotor();
    };
  }, [userinfo]);

  if(loading){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <PageNameContext.Provider value={contextValue}>
      <NavigationContainer independent={true}>
        <RouterConfig initialRouteName={initialRoute} />
      </NavigationContainer>
    </PageNameContext.Provider>
  );
}