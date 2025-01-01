import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routerConfiguration';
import TopBackButton from '@/app/components/button/DefaultBack';
import { TopRightHeader } from '@/app/components/TopRightHeader';

interface RouterConfigProps {
  initialRouteName: string;
}

const Stack = createStackNavigator();

const RouterConfig: React.FC<RouterConfigProps> = ({ initialRouteName }) =>{

  const showBackButton = (headerShown: boolean) => {
    return headerShown ? <TopBackButton /> : null;
  };

  return (
      <Stack.Navigator initialRouteName={ initialRouteName }>
        {routes.map((route) => (
          <Stack.Screen
            key={route.name}
            name={route?.name}
            component={route.component}
            options={{ 
              title: route?.title,
              headerShown: route?.headerShown,
              headerStyle:{
                height: 90
              },
              headerLeft: () => showBackButton(route?.showLeftButton ?? true),
              headerRight: () => <TopRightHeader />}}
          />
        ))}
      </Stack.Navigator>
  );
}

export default RouterConfig;