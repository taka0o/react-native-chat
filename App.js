import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Main from './component/Main';
import Chat from './component/Chat';

const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat }
});

export default navigator;
