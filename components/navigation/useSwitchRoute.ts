import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './HookStackParamList';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const useSwitchRoute = () => {
    const navigation = useNavigation<NavigationProp>();
  
    const switchRoute = (route : string = "Home") => {
      navigation.navigate(route);
    };
    
    const setTitle = (title:string) =>{
      navigation.setOptions({ title });
    }
  
    return { switchRoute, setTitle};
};