import {combineReducers} from 'redux';
import loadingMessage from './loadingMessage';
import events from './events';
import dislikedEventsById from './dislikedEventsById';

const rootReducer = combineReducers({
  loadingMessage,
  events,
  dislikedEventsById,
});

export default rootReducer;