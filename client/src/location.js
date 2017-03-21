// TODO:  Setting maximumAge doesn't actually seem to enable caching...
const OPTS = {
  maximumAge: 60000 // one minute
};

const getLocation = () => new Promise((resolve,reject) => {
  if (!navigator.geolocation) {
    reject('(location.js) navigator.geolocation not available');
  }
  const onPosition = position => resolve({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });
  const onError = positionError => reject(positionError.message);
  navigator.geolocation.getCurrentPosition(onPosition, onError, OPTS);
});

module.exports = {getLocation};