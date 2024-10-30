import React, { useState, useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import RouterConfig from "./router/RouterConfig";
import PageNameContext from '@/app/hooks/FirebaseContext';
import { database } from '../config'
import { ref, onValue } from 'firebase/database';

export default function Index(){

  const [userData, setUserData] = useState<any>({});
  const [motorData, setMotorData] = useState<any>({})

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
 

  useEffect(() => {
    const dbRef = ref(database, 'users/E2O8uA4w3UHWI4S3hgeZ');
    const dbMotorsRef = ref(database, 'motors/qJzAIcv03PyaWqxRgO4mSU3l');
  
    const unsubscribeUser = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData(null);
      }
    }, (error) => {
      setError(error);
    });
  
    const unsubscribeMotor = onValue(dbMotorsRef, (snapshot) => {
      if (snapshot.exists()) {
        setMotorData(snapshot.val());
      } else {
        setMotorData(null);
      }
    }, (error) => {
      setError(error);
    });
  
    // Cleanup function to remove listeners when the component unmounts
    return () => {
      unsubscribeUser();
      unsubscribeMotor();
    };
  }, []);
  

  return (
    <PageNameContext.Provider value={{userData, motorData}}>
      {
        Object.keys(motorData).length > 0 && (
          <NavigationContainer independent={true}>
            <RouterConfig />
          </NavigationContainer>
        )
      }
      
    </PageNameContext.Provider>
   
  )
}