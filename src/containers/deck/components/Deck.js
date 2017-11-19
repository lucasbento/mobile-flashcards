import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import format from 'date-fns/format';

import { Card } from '../../../components/common';

class Deck extends PureComponent {
  renderQuestionsQuantity = () => {
    const { questions } = this.props;

    return questions.length === 0 || questions.length > 1 ?
    `${questions.length} questions` :
    '1 question'
  }

  render() {
    const {
      id,
      name,
      createdAt,
      goToDeckDetail,
    } = this.props;

    return (
      <Card
        title={name}
        subtitle={this.renderQuestionsQuantity()}
        date={format(createdAt, 'DD/MM/YYYY HH:mm')}
        onPress={() => goToDeckDetail(id)}
      />
    );
  }
}

export default Deck;
