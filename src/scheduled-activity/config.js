import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from '../navigation/stackNavigator';

const config = () => {
  const authState = useSelector(state => state.authState);
  return (
    <NavigationContainer>
      {authState.isLoggedIn ? <StackNavigator /> : null}
    </NavigationContainer>
  );
};

export default config;