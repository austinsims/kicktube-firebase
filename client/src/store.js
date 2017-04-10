// @flow

import {createStore, applyMiddleware} from 'redux';
import {defaultEventsState} from './reducers/events';
import {fetchEvents} from './actions/events';
import {getLocation} from './util/location'
import {updateLoadingMessage} from './actions/loadingMessage'
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';

const defaultState = {
  loadingMessage: '',
  events: defaultEventsState,
};

const store =
    createStore(rootReducer, defaultState, applyMiddleware(thunkMiddleware));

// Load the first page.
store.dispatch(updateLoadingMessage('Determining your location...'));
getLocation().then(location => {
  store.dispatch(updateLoadingMessage('Fetching events near you...'));
  store.dispatch(fetchEvents(location, 0)); 
});

export default store;
