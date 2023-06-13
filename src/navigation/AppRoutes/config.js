import React from 'react';
import {
  Heart,
  Home,
  HomeFocus,
  HeartFocus,
  User,
  UserFocus,
  Clock,
  ClockFocus,
} from '~/icons';

export const config = [
  {
    name: 'Home',
    component: require('~/screens/Homes/Home').default,
    options: {
      tabBarIcon: ({focused, color}) => {
        return focused ? <HomeFocus /> : <Home />;
      },
    },
  },
  {
    name: 'Favorite',
    component: require('~/screens/Favorite/Favorite').default,
    options: {
      tabBarIcon: ({focused, color}) => {
        return focused ? <HeartFocus /> : <Heart />;
      },
    },
  },
  {
    name: 'User',
    component: require('~/screens/User/User').default,
    options: {
      tabBarIcon: ({focused, color}) => {
        return focused ? <UserFocus /> : <User />;
      },
    },
  },
  {
    name: 'Recent',
    component: require('~/screens/Recent/Recent').default,
    options: {
      tabBarIcon: ({focused, color}) => {
        return focused ? <ClockFocus /> : <Clock />;
      },
    },
  },
];
