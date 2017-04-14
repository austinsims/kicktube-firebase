'use strict';

const functions = require('firebase-functions');
const google = require('googleapis');

const youtube = google.youtube('v3');

/**
 * Resolves with an object containing the ID and a thumbnail URL for the first
 *     video for the given query, like:
 *     {id: "0xDEADBEEF", thumbnailUrl: "https://gstatic.com/thumb.jpg"}
 * @param {string} query 
 */
const getFirstVideoForQuery = query => new Promise((resolve, reject) => {
  const apiKey = functions.config().youtube.key;
  if (!apiKey) {
    reject('No YouTube API configured ' +
           '(https://firebase.google.com/docs/functions/config-env)');
    return;
  }
  const opts = {
    key: apiKey,
    part: 'snippet',
    q: query,
    type: 'video',
    videoCategoryId: 10, // restrict to  Music category
  };
  const onResult = (err, res) => {
    if (err) {
      // TODO: Consider just dropping this query if it fails. Don't want to
      // ruin a whole page of results for one failed search. Maybe log warning.
      reject('YouTube search failed for query ${query}:' + err);
      return;
    }

    // If no video found, or if missing the info we need, resolve to null.
    if (!res.items.length ||
        !res.items[0].id ||
        !res.items[0].id.videoId ||
        !res.items[0].snippet ||
        !res.items[0].snippet.thumbnails ||
        !res.items[0].snippet.thumbnails.default ||
        !res.items[0].snippet.thumbnails.default.url) {
      resolve(null);
      // <DO NOT SUBMIT>
      console.log('No video found for query: ' + query + ' with response: ' + JSON.stringify(res));
      // </DO NOT SUBMIT>
      return;
    }

    // Resolve with info about the first video.
    resolve({
      id: res.items[0].id.videoId,
      thumbnailUrl: res.items[0].snippet.thumbnails.default.url,
    });
  };
  youtube.search.list(opts, onResult);
});

module.exports = {getFirstVideoForQuery};