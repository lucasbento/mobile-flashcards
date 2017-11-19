import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { setChosenDeck, answerQuestion } from '../../modules/quiz';

import { Loading, Text, Button } from '../../components/common';

class Quiz extends PureComponent {
  state = {
    isLoading: true,
    showAnswer: false,
  };

  static navigationOptions = {
    headerTitle: 'Quiz',
  };

  componentWillMount() {
    this.handleSetChosenDeck();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quiz.isFinished && nextProps.quiz.isFinished !== this.props.quiz.isFinished) {
      return this.props.navigation.navigate('FinishedQuiz', {
        deckDetailRouteKey: this.props.navigation.state.params.deckDetailRouteKey,
      });
    }
  }

  handleSetChosenDeck = async () => {
    const {
      deck: {
        decks,
      },
      navigation: {
        state,
      },
    } = this.props;

    const deck = decks.filter(({ id }) => id === state.params.deckId)[0];

    await this.props.actions.setChosenDeck(deck);

    this.setState({
      isLoading: false,
    });
  };

  handleShowAnswer = () =>
    this.setState({
      showAnswer: true,
    });
  
  handleAnswerQuestion = isAnswerCorrect => async () => {
    await this.props.actions.answerQuestion(isAnswerCorrect);

    this.setState({
      showAnswer: false,
    });
  };

  render() {
    const { isLoading, showAnswer } = this.state;

    if (isLoading) {
      return (
        <Loading />
      );
    }

    const {
      chosenDeck: {
        name,
        questions,
      },
      currentQuestionIndex,
    } = this.props.quiz;

    const question = questions[currentQuestionIndex];

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.deckName}>{name}</Text>

          <Text>{currentQuestionIndex + 1}/{questions.length}</Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>{question.title}</Text>

          {showAnswer ? (
            <Text style={styles.questionAnswer}>{question.answer}</Text>
          ) : (
            <Button
              label="Show answer"
              onPress={this.handleShowAnswer}
            />
          )}
        </View>

        <View style={styles.actionContainer}>
          <Button
            type="secondary"
            label="Incorrect"
            onPress={this.handleAnswerQuestion(false)}
          />

          <Button
            label="Correct"
            onPress={this.handleAnswerQuestion(true)}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deckName: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    flex: 1,
  },
  questionContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionTitle: {
    fontSize: 23,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({ quiz, deck }) => ({
  quiz,
  deck,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    setChosenDeck: deck => dispatch(setChosenDeck(deck)),
    answerQuestion: answer => dispatch(answerQuestion(answer)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
