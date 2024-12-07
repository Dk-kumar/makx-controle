import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RouterConfig from './router/RouterConfig';
import { database } from '../config';
import { ref, onValue } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfo{
  userid ?: string;
  motorid ?: string;
}
interface UserContextType{
  userinfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  userData: object;
  motorData: object;
  removeSigninCredentials: () => Promise<void>;
}

const PageNameContext = createContext<UserContextType | null>(null);

export const usePageNameContext = () =>{
  const context = useContext(PageNameContext);
  if(!context){
    throw new Error('usePageNameContext');
  }
  return context;
};

export default function Index(){
  const [userinfo, setUserInfo] = useState<UserInfo>({});
  const [userData, setUserData] = useState<object>({});
  const [motorData, setMotorData] = useState<object>({});
  const [initialRoute, setInitialRoute] = useState('Signin');
  const [loading, setLoading] = useState(true);

  const saveToStorageIfChanged = async (key: string, data: object) =>{
    try{
      const currentData = await AsyncStorage.getItem(key);
      if(currentData !== JSON.stringify(data)){
        await AsyncStorage.setItem(key, JSON.stringify(data));
      }
    }catch(error){
      console.error(`Error saving ${key} to AsyncStorage:`, error);
    }
  };

  const removeSigninCredentials = async () =>{
    try{
      await AsyncStorage.multiRemove(['userData', 'motorData']);
      setUserInfo({});
      setUserData({});
      setMotorData({});
    }catch(error){
      console.error('Error during sign out:', error);
    }
  };

  useEffect(() => {
    const loadStoredData = async () => {
      try{
        const userInfoData = await AsyncStorage.getItem("userInfoData");
        userInfoData && (setUserInfo(JSON.parse(userInfoData)), setInitialRoute("Home"));
        setLoading(false);
      }
      catch(error){
        console.error('Error loading stored data:', error);
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() =>{
    const { userid, motorid } = userinfo;
    if (!userid || !motorid) return;

    saveToStorageIfChanged("userInfoData", userinfo);

    const userRef = ref(database, `users/${userid}`);
    const motorRef = ref(database, `motors/${motorid}`);

    const unsubscribeUser = onValue(userRef, async (snapshot) => {
      const updatedUserData = snapshot.exists() ? snapshot.val() : {};
      setUserData(updatedUserData);
    });

    const unsubscribeMotor = onValue(motorRef, async (snapshot) => {
      const updatedMotorData = snapshot.exists() ? snapshot.val() : {};
      setMotorData(updatedMotorData);
    });

    return () => {
      unsubscribeUser();
      unsubscribeMotor();
    };
  }, []);

  if(loading)
  {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <PageNameContext.Provider
      value={{ userinfo, setUserInfo, userData, motorData, removeSigninCredentials }}
    >
      <NavigationContainer independent={true}>
        <RouterConfig initialRouteName={ initialRoute }/>
      </NavigationContainer>
    </PageNameContext.Provider>
  );
}