import React, { PureComponent } from 'react';
import { AsyncStorage, View, Text, StyleSheet } from 'react-native';
import { Font } from 'expo';
import { persistStore } from 'redux-persist';

import {
  requestNotificationPermission,
  scheduleLocalNotification,
} from './notifications';

import Router from './Router';
import store from './store';

import { Loading } from './components/common';

class FlashCards extends PureComponent {
  state = {
    isRehydrating: true,
    isLoadingFont: true,
  };

  componentDidMount() {
    this.requestNotificationPermission();
    this.handleLoadFonts();
    this.handlePersistStore();
  }

  requestNotificationPermission = () => {
    const permissionGranted = requestNotificationPermission();

    if (permissionGranted) {
      return scheduleLocalNotification();
    }
  };

  handleLoadFonts = async () => {
    await Font.loadAsync({
      'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
      'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
      'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
    });

    this.setState({
      isLoadingFont: false,
    });
  };

  handlePersistStore = () =>
    persistStore(store, {
      storage: AsyncStorage,
      whitelist: ['deck'],
    }, () =>
      this.setState({
        isRehydrating: false,
      }),
    );

  render() {
    const { isRehydrating, isLoadingFont } = this.state;

    if (isRehydrating || isLoadingFont) {
      return (
        <Loading />
      );
    }

    return (
      <Router />
    );
  }
}

export default FlashCards;
