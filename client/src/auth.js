// @flow

/**
 * @fileoverview Waits for the user to login, then dispatches their FirebaseUser
 *     object to the Store.
 */

import {setUser} from './actions/user';
import firebaseApp from './util/firebaseApp';
import store from './store';
import type {FirebaseUser} from './util/typedefs';

firebaseApp.auth().onAuthStateChanged((user: FirebaseUser) => {
  store.dispatch(setUser(user));
});