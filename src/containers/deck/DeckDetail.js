import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { Text, Button } from '../../components/common';

class DeckDetail extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Deck Detail',
  };

  constructor(props) {
    super(props);

    const {
      deck: {
        decks,
      },
      navigation: {
        state,
      },
    } = props;

    const deck = decks.filter(({ id }) => id === state.params.id)[0];

    this.state = {
      deck,
    };
  }

  handleGoToAddQuestion = () =>
    this.props.navigation.navigate('AddQuestion', {
      deckId: this.props.navigation.state.params.id,
    });

  handleGoToQuiz = () =>
    this.props.navigation.navigate('Quiz', {
      deckId: this.props.navigation.state.params.id,
      deckDetailRouteKey: this.props.navigation.state.key,
    });

  renderQuestionsQuantity = () => {
    const { questions } = this.state.deck;

    return questions.length === 0 || questions.length > 1 ?
    `${questions.length} questions` :
    '1 question'
  }

  render() {
    const { name, questions } = this.state.deck;

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.questions}>
            {this.renderQuestionsQuantity()}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            type="secondary"
            label="Add question"
            onPress={this.handleGoToAddQuestion}
          />

          <Button
            label="Start quiz"
            onPress={this.handleGoToQuiz}
            disabled={!questions.length}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  name: {
    fontSize: 23,
    textAlign: 'center',
  },
  questions: {
    fontSize: 19,
    textAlign: 'center',
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({ deck }) => ({
  deck,
});

export default connect(mapStateToProps)(DeckDetail);
