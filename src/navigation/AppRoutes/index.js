import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {config} from './config';
import {colors} from '~/values/colors';
import {Easing} from 'react-native';

const Tab = createBottomTabNavigator();
function AppRoutes() {
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
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: colors.gray,
        },
      }}>
      {config.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            ...item.options,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default AppRoutes;
