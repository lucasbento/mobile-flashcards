import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';

import FlashCards from './src/FlashCards';
// AsyncStorage.clear();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FlashCards />
      </Provider>
    );
  }
}

export default App;
