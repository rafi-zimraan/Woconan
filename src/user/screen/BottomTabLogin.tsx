import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Grey} from '../utils/Colors';
import Search from './Search';
import Create from './Create';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomTabLogin = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        headerPressColor: Grey,
        tabBarStyle: {height: hp('8%')},
        tabBarIcon: ({focused, size, color}) => {
          let iconImage: any;
          if (route.name === 'home') {
            iconImage = focused ? 'home' : 'home';
            color = focused ? '#FF9125' : 'gray';
            size = focused ? size + 6 : size + 1;
          } else if (route.name === 'search') {
            iconImage = focused ? 'magnify' : 'magnify';
            color = focused ? '#FF9125' : 'gray';
            size = focused ? size + 6 : size + 1;
          } else if (route.name === 'create') {
            iconImage = focused ? 'pen' : 'pen';
            color = focused ? '#FF9125' : 'gray';
            size = focused ? size + 6 : size + 1;
          } else if (route.name === 'profile') {
            iconImage = focused ? 'account' : 'account';
            color = focused ? '#FF9125' : 'gray';
            size = focused ? size + 6 : size + 1;
          }
          return <Icon name={iconImage} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="create" component={Create} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabLogin;
