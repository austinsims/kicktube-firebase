// @flow

import {createStore, applyMiddleware, compose} from 'redux';
import {defaultEventsState} from './reducers/events';
import {fetchEvents} from './actions/events';
import {getLocation} from './util/location'
import {updateLoadingMessage} from './actions/loadingMessage'
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import type {FirebaseUser} from './util/typedefs';

const defaultState = {
  loadingMessage: '',
  events: defaultEventsState,
  dislikedEventsById: [],
  likedEventsById: [],
  user: null,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunkMiddleware)));

// Load the first page.
store.dispatch(updateLoadingMessage('Determining your location...'));
getLocation().then(location => {
  store.dispatch(updateLoadingMessage('Fetching events near you...'));
  store.dispatch(fetchEvents(location, 0)); 
});



export default store;
