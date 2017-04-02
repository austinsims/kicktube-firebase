import {combineReducers} from 'redux';
import loadingMessage from './loadingMessage';
import events from './events';
import playingVideoIndex from './playingVideoIndex';

const rootReducer = combineReducers({
  loadingMessage,
  events,
  playingVideoIndex,
});

export default rootReducer;