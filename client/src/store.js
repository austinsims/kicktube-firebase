import {createStore, compose} from 'redux';
import rootReducer from './reducers/index';

const loadingMessage = '';
const events = null;
let playingVideoIndex = null;

const defaultState = {
  loadingMessage,
  events,
  playingVideoIndex,
};

const store = createStore(rootReducer, defaultState);

export default store;
