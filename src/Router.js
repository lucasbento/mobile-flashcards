import { TabNavigator, StackNavigator } from 'react-navigation';

import DeckList from './containers/deck/DeckList';
import DeckDetail from './containers/deck/DeckDetail';
import CreateDeck from './containers/deck/CreateDeck';

import AddQuestion from './containers/question/AddQuestion';

import Quiz from './containers/quiz/Quiz';
import FinishedQuiz from './containers/quiz/FinishedQuiz';

export default StackNavigator({
  Main: {
    screen: DeckList,
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  CreateDeck: {
    screen: CreateDeck,
  },
  AddQuestion: {
    screen: AddQuestion,
  },
  Quiz: {
    screen: Quiz,
  },
  FinishedQuiz: {
    screen: FinishedQuiz,
  },
});
