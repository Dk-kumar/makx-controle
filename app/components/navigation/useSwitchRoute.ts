import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './HookStackParamList';

export const useSwitchRoute = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
    const switchRoute = (route : string = "Home", params?: object) => {
      navigation.navigate(route, params as any);
    };

    const switchBack = () => {
      if(navigation.canGoBack()){
        navigation.goBack();
      }else{
        switchRoute("Home");
      }
    }
    
    const setTitle = (title:string) =>{
      navigation.setOptions({ title });
    }
  
    return { switchRoute, switchBack, setTitle};
};