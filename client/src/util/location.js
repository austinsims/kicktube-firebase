// @flow

import firebaseApp from './firebaseApp';
import Promise from 'bluebird';
import type {FirebaseUser} from './typedefs';

let cachedLocation;

/**
 * Get the user's location.  Caches for subsequent calls.
 */
const getLocationFromNavigator = () => new Promise((resolve,reject) => {
  if (!navigator.geolocation) {
    reject(new Error('(location.js) navigator.geolocation not available'));
  }
  const onPosition = position => {
    resolve({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };
  const onError = positionError => reject(new Error(positionError.message));
  navigator.geolocation.getCurrentPosition(onPosition, onError);
});

const userPromise = new Promise((resolve, reject) => {
  firebaseApp.auth().onAuthStateChanged((user: FirebaseUser) => {
    resolve(user);
  });
});

const getLocationFromProfile = () => new Promise((resolve, reject) => {
  userPromise.then(user => {
    firebaseApp.database().ref(`profile/${user.uid}/location`).once('value').then(snapshot => {
      const location = snapshot.val();
      if (location) {
        resolve(location);
      } else {
        reject(new Error('Location not available in profile'));
      }
    });
  });
});

const getCachedLocation = () => new Promise((resolve, reject) => {
  if (cachedLocation) resolve(cachedLocation);
  else reject(new Error('location not cached'));
});

export function getLocation() {
  const promise = Promise.any([
    getLocationFromNavigator(),
    getLocationFromProfile(),
    getCachedLocation()
  ]);
  promise.then(location => {
    cachedLocation = location;
    userPromise.then(user => {
      firebaseApp.database().ref(`profile/${user.uid}/location`).set(location);
    });
  });
  return promise;
}