const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const songkick = require('./songkick');
const youtube = require('./youtube');

/**
 * Gets events for a given location.
 * 
 * TODO: Specify schema for events return value JSON in this comment.
 * 
 * The request must specify "latitude" and "longitude" params, both of which
 * are dobules.  Example: "/events?latitude=70.123&longitude=40.1234"
 * 
 */
exports.events = functions.https.onRequest((req, resp) => new Promise((resolve, reject) => {
  const onResp = () => {
    parseLatLong(req.query)
      .then(songkick.getEventsForLocation)
      .then(events => Promise.all(events.map(maybeAddVideo)))
      .then(events => {
        resp.status(200).send(JSON.stringify(events));
        resolve();
      })
      .catch(reason => {
        // TODO: Only send reason if debug mode?
        resp.status(500).send(reason);
        resolve();
      });
  }
  cors(req, resp, onResp);
}));

/**
 * Parse latitude and longitude strings from query into numbers, or reject
 * if query could not be parsed.
 * @param {*} query Object with strings "latitude" and "longitude".
 */
const parseLatLong = query => new Promise((resolve, reject) => {
  const latitude = parseFloat(query.latitude);
  const longitude = parseFloat(query.longitude);
  if (isNaN(latitude) || isNaN(longitude)) {
    reject('Could not parse latitude and longitude from query :(');
  } else {
    resolve({latitude, longitude});
  }
});

const maybeAddVideo = event => new Promise((resolve, reject) => {
  // If the event doesn't have enough info to make a query, don't try.
  if (!event.performance ||
      !event.performance.length ||
      !event.performance[0].artist ||
      !event.performance[0].artist.displayName) {
    resolve(event);
    return;
  }

  const query = event.performance[0].artist.displayName;
  youtube.getFirstVideoForQuery(query)
    .then(video => {
      if (video) {
        event.videoId = video.id;
        event.videoThumbnailUrl = video.thumbnailUrl;
      }
      resolve(event);
    })
    .catch(reason => reject(`Couldn't search YT for "${query}: ${reason}"`));
});