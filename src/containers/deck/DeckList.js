import React, { PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import Deck from './components/Deck';

import { Button, Loading } from '../../components/common';

class DeckList extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Deck',
  };

  handleGoToCreateDeck = () =>
    this.props.navigation.navigate('CreateDeck');

  handleGoToDeckDetail = id =>
    this.props.navigation.navigate('DeckDetail', { id });

  renderDeck = ({ item }) => (
    <Deck
      {...item}
      goToDeckDetail={this.handleGoToDeckDetail}
    />
  );

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={deck.decks}
          keyExtractor={(item, index) => index}
          renderItem={this.renderDeck}
          style={styles.deckList}
        />

        <Button
          label="Create Deck"
          onPress={this.handleGoToCreateDeck}
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
    padding: 10,
  },
  deckList: {
    width: '100%',
  },
});

const mapStateToProps = ({ deck }) => ({
  deck,
});

export default connect(mapStateToProps)(DeckList);
