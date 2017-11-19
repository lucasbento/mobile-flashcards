import { createAction, handleActions } from 'redux-actions';

const initialState = {
  decks: [],
};

export const TYPES = {
  CREATE_DECK: 'CREATE_DECK',
  ADD_QUESTION: 'ADD_QUESTION',
};

export const createDeck = createAction(TYPES.CREATE_DECK);
export const addQuestion = createAction(TYPES.ADD_QUESTION);

export default handleActions(
  {
    [TYPES.CREATE_DECK]: (state, { payload: deck }) => ({
      ...state,
      decks: [
        ...state.decks,
        {
          ...deck,
          id: state.decks.length + 1,
          questions: [],
          createdAt: new Date().toISOString(),
        },
      ],
    }),

    [TYPES.ADD_QUESTION]: (state, { payload }) => {
      const { deckId, ...question } = payload;

      const decks = [ ...state.decks ];
      const deck = decks.filter(({ id }) => id === deckId)[0];

      deck.questions = [
        ...deck.questions,
        {
          ...question,
          id: deck.questions.length + 1,
        },
      ];

      return {
        ...state,
        decks,
      };
    },
  },
  initialState,
);
