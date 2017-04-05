// TODO:  Setting maximumAge doesn't actually seem to enable caching...
const OPTS = {
  maximumAge: 60000 // one minute
};

/**
 * Get the user's location.  Caches for subsequent calls.
 */
const getLocation = () => new Promise((resolve,reject) => {
  if (cachedLocation) {
    resolve(cachedLocation);
    return;
  }
  if (!navigator.geolocation) {
    reject('(location.js) navigator.geolocation not available');
  }
  const onPosition = position => {
    cachedLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }
    resolve(cachedLocation);
  };
  const onError = positionError => reject(positionError.message);
  navigator.geolocation.getCurrentPosition(onPosition, onError, OPTS);
});

let cachedLocation;

module.exports = {getLocation};