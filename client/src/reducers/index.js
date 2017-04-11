import {combineReducers} from 'redux';
import loadingMessage from './loadingMessage';
import events from './events';
import dislikedEventsById from './dislikedEventsById';
import user from './user';

const rootReducer = combineReducers({
  loadingMessage,
  events,
  dislikedEventsById,
  user,
});

export default rootReducer;