import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';

class Loading extends PureComponent {
  render() {
    const { fullScreen = true, containerStyle, ...props } = this.props;

    if (fullScreen) {
      return (
        <View style={[styles.container, containerStyle]}>
          <ActivityIndicator {...props} />
        </View>
      );
    }

    return (
      <ActivityIndicator {...props} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
