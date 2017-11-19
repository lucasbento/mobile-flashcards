import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { calculateStats, restartQuiz } from '../../modules/quiz';

import { Text, Button, Loading } from '../../components/common';

class FinishedQuiz extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Finished Quiz',
  };

  componentWillMount() {
    this.props.actions.calculateStats();
  }

  handleGoBackToDeck = () =>
    this.props.navigation.goBack(
      this.props.navigation.state.params.deckDetailRouteKey,
    );

  handleRestartQuiz = () => {
    this.props.actions.restartQuiz();

    this.props.navigation.goBack();
  };

  render() {
    const { isLoading, score } = this.props.quiz.stats;

    if (isLoading) {
      return (
        <Loading />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Text style={styles.yourScoreText}>Your score is:</Text>

          <Text style={styles.score}>{score}%</Text>
        </View>

        <View style={styles.actionContainer}>
          <Button
            type="secondary"
            label="Back to deck"
            onPress={this.handleGoBackToDeck}
          />

          <Button
            label="Restart quiz"
            onPress={this.handleRestartQuiz}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourScoreText: {
    fontSize: 24,
  },
  score: {
    fontSize: 27,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({ quiz }) => ({
  quiz,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    calculateStats: () => dispatch(calculateStats()),
    restartQuiz: () => dispatch(restartQuiz()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishedQuiz);
