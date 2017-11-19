import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, TextProperties, StyleSheet } from 'react-native';

class Text extends PureComponent {
  static propTypes = TextProperties;

  render() {
    const { style, ...rest } = this.props;

    return (
      <RNText
        style={[styles.text, style]}
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rubik-Regular',
  },
});

export default Text;
