import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routerConfiguration';
import TopBackButton from '@/app/components/button/DefaultBack';
import { TopRightHeader } from '@/app/components/TopRightHeader';

const Stack = createStackNavigator();

const RouterConfig: React.FC = () =>{
  
  const showBackButton = (headerShown: boolean) => {
    return headerShown ? <TopBackButton /> : null;
  };

  return (
      <Stack.Navigator initialRouteName="Home">
        {routes.map((route) => (
          <Stack.Screen
            key={route.name}
            name={route?.name}
            component={route.component}
            options={{ 
              title: route?.title,
              headerShown: true,
              headerStyle:{
                height: 95
              },
              headerLeft: () => showBackButton(route?.showLeftButton ?? true),
              headerRight: () => <TopRightHeader />}}
          />
        ))}
      </Stack.Navigator>
  );
}

export default RouterConfig;