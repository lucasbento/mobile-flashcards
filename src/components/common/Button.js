import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Text } from './';

class Button extends PureComponent {
  static defaultProps = {
    type: 'primary',
    onPress: () => {},
    style: {},
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'primary',
      'secondary',
    ]).isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    disabled: PropTypes.bool,
  };

  render() {
    const {
      label,
      style,
      type,
      disabled,
      ...rest,
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.container,
          styles[`${type}Container`],
          disabled && styles.disabledContainer,
          style,
        ]}
        {...rest}
      >
        <Text style={[
          styles.buttonText,
          styles[`${type}Text`],
          disabled && styles.disabledText,
        ]}>
          {label.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 130,
  },
  primaryContainer: {
    backgroundColor: 'black',
  },
  secondaryContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  disabledContainer: {
    backgroundColor: '#EEE',
  },
  buttonText: {
    fontFamily: 'Rubik-Medium',
    textAlign: 'center',
    fontSize: 11,
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'black',
  },
  disabledText: {
    color: '#AAA',
  },
});

export default Button;
