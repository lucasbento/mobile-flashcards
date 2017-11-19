import { createAction, handleActions } from 'redux-actions';

const initialState = {
  chosenDeck: null,
  currentQuestionIndex: 0,
  isFinished: false,
  stats: {
    isLoading: true,
    score: 0,
  },
};

export const TYPES = {
  SET_CHOSEN_DECK: 'SET_CHOSEN_DECK',
  RESTART_QUIZ: 'RESTART_QUIZ',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  CALCULATE_STATS: 'CALCULATE_STATS',
};

export const setChosenDeck = createAction(TYPES.SET_CHOSEN_DECK);
export const restartQuiz = createAction(TYPES.RESTART_QUIZ);

export const answerQuestion = createAction(TYPES.ANSWER_QUESTION);

export const calculateStats = createAction(TYPES.CALCULATE_STATS);

export default handleActions(
  {
    [TYPES.SET_CHOSEN_DECK]: (state, { payload: chosenDeck }) => ({
      ...state,
      chosenDeck,
      currentQuestionIndex: 0,
    }),

    [TYPES.RESTART_QUIZ]: state => ({
      ...initialState,
      chosenDeck: state.chosenDeck,
    }),

    [TYPES.ANSWER_QUESTION]: (state, { payload: isAnswerCorrect }) => {
      const questions = state.chosenDeck.questions.map((question, index) => (
        index === state.currentQuestionIndex ?
          {
            ...question,
            isAnswerCorrect,
          } : question
        ),
      );

      const currentQuestionIndex = questions.findIndex((question, index) =>
        index === state.currentQuestionIndex,
      );

      const isFinished = currentQuestionIndex === (questions.length - 1);

      return {
        ...state,
        chosenDeck: {
          ...state.chosenDeck,
          questions,
        },
        currentQuestionIndex: !isFinished ? currentQuestionIndex + 1 : 0,
        isFinished,
      };
    },

    [TYPES.CALCULATE_STATS]: state => {
      const correctAnswers = state.chosenDeck.questions.filter(({ isAnswerCorrect }) => isAnswerCorrect);
      const questionsLength = state.chosenDeck.questions.length;

      return {
        ...state,
        stats: {
          isLoading: false,
          score: (correctAnswers.length / questionsLength) * 100,
        },
      };
    },
  },
  initialState,
);
