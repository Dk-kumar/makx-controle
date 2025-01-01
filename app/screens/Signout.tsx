import { useEffect } from 'react';
import { useSwitchRoute } from '@/app/components/navigation/useSwitchRoute';
import { usePageNameContext } from '@/app/index'; // Import context hook
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signout: React.FC = () => {
  const { removeSigninCredentials } = usePageNameContext();
  const { switchRoute } = useSwitchRoute();

  useEffect(() => {
    const signOutUser = async () => {
      try {
        // Clear AsyncStorage
        await AsyncStorage.multiRemove(['userInfoata']);
        
        // Call the function to reset context and remove credentials
        await removeSigninCredentials();
        
        // Navigate to the Signin screen after signing out
        switchRoute('Signin');
      } catch (error) {
        console.error('Error during sign out:', error);
      }
    };

    signOutUser();
  }, [removeSigninCredentials, switchRoute]);

  return null;
};

export default Signout;
