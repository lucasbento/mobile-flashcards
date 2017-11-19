import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { autoRehydrate } from 'redux-persist';

import modules from './modules';

const reducers = combineReducers(modules);

export default createStore(
  reducers,
  compose(
    autoRehydrate(),
  ),
);
