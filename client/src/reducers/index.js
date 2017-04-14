import {combineReducers} from 'redux';
import dislikedEventsById from './dislikedEventsById';
import events from './events';
import likedEventsById from './likedEventsById';
import loadingMessage from './loadingMessage';
import user from './user';

const rootReducer = combineReducers({
  loadingMessage,
  events,
  dislikedEventsById,
  likedEventsById,
  user,
});

export default rootReducer;