// @flow

import {createStore, applyMiddleware, compose} from 'redux';
import {defaultEventsState} from './reducers/events';
import {dislikeEvent} from './actions/dislikedEventsById';
import {fetchEvents} from './actions/events';
import {getLocation} from './util/location'
import {setUser} from './actions/user';
import {updateLoadingMessage} from './actions/loadingMessage'
import arrayEqual from 'array-equal'
import firebase from 'firebase';
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import type {FirebaseUser} from './util/typedefs';

const defaultState = {
  loadingMessage: '',
  events: defaultEventsState,
  dislikedEventsById: [],
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

const firebaseCongig = {
  apiKey: "AIzaSyBy7TfxbQsSeRUanBL6L_-IqWvzLXVkKzU",
  authDomain: "kicktube-87085.firebaseapp.com",
  databaseURL: "https://kicktube-87085.firebaseio.com",
  projectId: "kicktube-87085",
  storageBucket: "kicktube-87085.appspot.com",
  messagingSenderId: "1041672798109"
};
firebase.initializeApp(firebaseCongig);

function onProfile(snapshot) {
  const val = snapshot.val();
  const snapshotOfIds = val ? val.dislikedEventsById : {};
  let lastKnownIds = Object.keys(snapshotOfIds)
      .map(key => parseInt(key))
      .filter(maybeNumber => !isNaN(maybeNumber))
  
  // Update store with dislikes from snapshot.
  lastKnownIds.forEach(eventId => store.dispatch(dislikeEvent(eventId)));

  // Keep the remote database in sync with further dislikes.
  store.subscribe(function() {
    const state = store.getState();

    const user = state.user;
    if (!user) {
      return;
    }

    const dislikedEventIds = store.getState()['dislikedEventsById'];
    if (arrayEqual(dislikedEventIds, lastKnownIds)) {
      return;
    }
    lastKnownIds = dislikedEventIds;

    const data = {};
    dislikedEventIds.forEach(id => data[String(id)] = true);
    console.log('data: ' + JSON.stringify(data));
    firebase.database().ref(`profile/${user.uid}`)
        .child('dislikedEventsById')
        .set(data);
  });
}

firebase.auth().onAuthStateChanged((user: FirebaseUser) => {
  store.dispatch(setUser(user));
  // When user logs in, get a one-time snapshot of their profile.
  firebase.database().ref(`profile/${user.uid}`)
      .once('value')
      .then(onProfile);
});


export default store;
