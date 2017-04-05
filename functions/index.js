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
 * Optional zero-indexed "page" param to request next pages, i.e.:
 *   "/events?latitude=12&longitude=21&page=1"
 * to get the second page.
 * 
 */
exports.events = functions.https.onRequest((req, resp) => new Promise((resolve, reject) => {
  const onResp = () => {
  const songkickQuery = {};
    parsePageNum(req.query)
      .then(pageNum => {
        songkickQuery.pageNum = pageNum;
        return parseLatLong(req.query);
      })
      .then(location => {
        songkickQuery.location = location;
        return songkick.getEventsForLocation(songkickQuery);
      })
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

/**
 * Parse page number from query if present, or yield default (0) if absent.
 * @param {*} query Object maybe string "page".
 */
const parsePageNum = query => new Promise((resolve, reject) => {
  if (typeof query.page !== 'string') {
    resolve(0);
  }
  const pageNumber = parseInt(query.page);
  if (!isNaN(pageNumber)) {
    resolve(pageNumber)
  } else {
    reject('Bad page number param: ' + query.page);
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