import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  TextInputProperties,
  StyleSheet,
} from 'react-native';

class TextInput extends PureComponent {
  static propTypes = TextInputProperties;

  render() {
    const { style, ...rest } = this.props;

    return (
      <RNTextInput
        style={[styles.textInput, style]}
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    fontFamily: 'Rubik-Regular',
    padding: 10,
    fontSize: 13,
    backgroundColor: 'white',
    marginVertical: 5,
  },
});

export default TextInput;
