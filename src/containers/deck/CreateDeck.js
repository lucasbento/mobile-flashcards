import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { createDeck } from '../../modules/deck';

import { TextInput, Button } from '../../components/common';

class CreateDeck extends PureComponent {
  state = {
    name: '',
    isFormValid: false,
  };

  static navigationOptions = {
    headerTitle: 'Create Deck',
  };

  handleChangeName = name =>
    this.setState({
      name,
      isFormValid: !!name,
    });

  handleCreateDeck = async () => {
    await this.props.actions.createDeck({
      name: this.state.name.trim(),
    });

    const createdDeck = this.props.deck.decks[this.props.deck.decks.length - 1];

    this.props.navigation.navigate('DeckDetail', {
      id: createdDeck.id,
    });
  };

  render() {
    const {
      name,
      isFormValid,
    } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="What's the title of the deck?"
          onChangeText={this.handleChangeName}
          value={name}
        />

        <Button
          label="Create Deck"
          onPress={this.handleCreateDeck}
          style={styles.createDeckButton}
          disabled={!isFormValid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  createDeckButton: {
    marginTop: 20,
  },
});

const mapStateToProps = ({ deck }) => ({
  deck,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    createDeck: deck => dispatch(createDeck(deck)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);
