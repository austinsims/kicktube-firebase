// @flow

import {createStore, applyMiddleware, compose} from 'redux';
import {defaultEventsState} from './reducers/events';
import {fetchEvents} from './actions/events';
import {getLocation} from './util/location'
import {loadState, saveState} from './localStorage';
import {updateLoadingMessage} from './actions/loadingMessage'
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';

import type {
  FirebaseUser,
  ReduxState,
  EventsState,
  SongkickEvent
} from './util/typedefs';

const savedState = loadState();
const defaultState: ReduxState = {
  loadingMessage: savedState.loadingMessage || '',
  events: savedState.events || defaultEventsState,
  dislikedEventsById: savedState.dislikedEventsById || [],
  likedEventsById: savedState.likedEventsById || [],
  user: savedState.user || null,
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


// Persist subset of the state to local storage.
store.subscribe(function() {
  const state: ReduxState = store.getState();
  const likedEventIds = state.likedEventsById || [];
  const items = state.events ? state.events.items : [];
  const subset: ReduxState = {
    // Only keep liked events.
    events: {
      isFetching: false,
      items: items.filter(event => likedEventIds.includes(event.id)),
    },
    likedEventsById: state.likedEventsById,
    // Keep the user object.
    user: state.user,
  };
  saveState(subset);
});

export default store;
