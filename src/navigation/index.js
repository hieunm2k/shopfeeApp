import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {config} from './config';
import {Easing} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const configAnimation = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 100,
    easing: Easing.ease,
  },
};
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          transitionSpec: {
            open: configAnimation,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {config?.map(item => (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={item.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
