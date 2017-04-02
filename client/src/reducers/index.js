import {combineReducers} from 'redux';
import loadingMessage from './loadingMessage';
import events from './events';

const rootReducer = combineReducers({
  loadingMessage,
  events,
});

export default rootReducer;