// @flow

/**
 * @fileoverview Initializes the page from the initial database snapshot, then
 *     keeps the database in sync as the user interacts with the application.
 */

import {dislikeEvent} from './actions/dislikedEventsById';
import {likeEvent} from './actions/likedEventsById';
import arrayEqual from 'array-equal'
import store from './store';
import type {FirebaseUser} from './util/typedefs';
import firebaseApp from './util/firebaseApp';

// When the user is updated in the Store, retrieve their profile.
let lastKnownUser: ?FirebaseUser = null;
store.subscribe(function() {
  const user: FirebaseUser = store.getState().user;
  if (lastKnownUser && lastKnownUser.uid === user.uid) {
    return;
  }
  firebaseApp.database().ref(`profile/${user.uid}`)
      .once('value')
      .then(onProfile);
  lastKnownUser = user;
});

/**
 * When the user profile is retrieved from the Firebase database, update various
 * piece of state in the Store (their liked and disliked events)
 */
function onProfile(snapshot) {
  const val = snapshot.val() || {};
  const dislikedEventsById = snapshotToIdList(val.dislikedEventsById || {});
  const likedEventsById = snapshotToIdList(val.likedEventsById || {});

  // Update store with opinions from snapshot.
  dislikedEventsById.forEach(eventId => store.dispatch(dislikeEvent(eventId)));
  likedEventsById.forEach(eventId => store.dispatch(likeEvent(eventId)));

  keepIdListInSync('dislikedEventsById', dislikedEventsById);
  keepIdListInSync('likedEventsById', likedEventsById);
}

// Keep the remote database in sync with further changes to the list.
function keepIdListInSync(label: string, initialIdList: Array<number>) {
  let lastKnownIdList = initialIdList;
  store.subscribe(function() {
    const state = store.getState();

    const user = state.user;
    if (!user) {
      return;
    }

    const idList = store.getState()[label];
    if (arrayEqual(idList, lastKnownIdList)) {
      return;
    }
    lastKnownIdList = idList;

    const data = {};
    idList.forEach(id => data[String(id)] = true);
    firebaseApp.database().ref(`profile/${user.uid}`)
        .child(label)
        .set(data);
  });
}

/**
 * Convert an object like:
 *   {1234: true, 4321: true}
 * into a list like:
 *   [1234, 4321]
 */
function snapshotToIdList(snapshot: Object): Array<number> {
  return Object.keys(snapshot)
      .map(key => parseInt(key))
      .filter(maybeNumber => !isNaN(maybeNumber));
}

