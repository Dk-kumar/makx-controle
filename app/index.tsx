import { NavigationContainer} from '@react-navigation/native';
import RouterConfig from "./router/RouterConfig";

export default function Index(){
  return (
    <NavigationContainer independent={true}>
        <RouterConfig />
    </NavigationContainer>
  );
}