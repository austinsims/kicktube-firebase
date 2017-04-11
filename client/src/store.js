// @flow

import {createStore, applyMiddleware} from 'redux';
import {defaultEventsState} from './reducers/events';
import {fetchEvents} from './actions/events';
import {getLocation} from './util/location'
import {setUser} from './actions/user';
import {updateLoadingMessage} from './actions/loadingMessage'
import firebase from 'firebase';
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';

const defaultState = {
  loadingMessage: '',
  events: defaultEventsState,
  dislikedEventsById: [],
  user: null,
};

const store =
    createStore(rootReducer, defaultState, applyMiddleware(thunkMiddleware));

// Load the first page.
store.dispatch(updateLoadingMessage('Determining your location...'));
getLocation().then(location => {
  store.dispatch(updateLoadingMessage('Fetching events near you...'));
  store.dispatch(fetchEvents(location, 0)); 
});

// Subscribe to Firebase auth state change events.
var config = {
  apiKey: "AIzaSyBy7TfxbQsSeRUanBL6L_-IqWvzLXVkKzU",
  authDomain: "kicktube-87085.firebaseapp.com",
  databaseURL: "https://kicktube-87085.firebaseio.com",
  projectId: "kicktube-87085",
  storageBucket: "kicktube-87085.appspot.com",
  messagingSenderId: "1041672798109"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user => store.dispatch(setUser(user)));

export default store;
