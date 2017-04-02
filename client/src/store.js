import {createStore, compose} from 'redux';
import rootReducer from './reducers/index';

const loadingMessage = '';
const events = null;

const defaultState = {
  loadingMessage,
  events,
};

const store = createStore(rootReducer, defaultState);

export default store;
