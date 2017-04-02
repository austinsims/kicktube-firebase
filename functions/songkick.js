const request = require('request');
const moment = require('moment');
const functions = require('firebase-functions');

/**
 * @param {*} location Object with strings "latitude" and "longitude".
 */
const getEventsForLocation = (location) => new Promise((resolve, reject) => {
  return getMetroAreaId(location)
      .then(getEventsForMetroAreaId)
      .then(events => {
        // Remove unnecessary properties, and format the date nicely.
        // TODO: Make a typedef for InternalEvent
        const internalEvents = events.map(event => ({
          displayName: event.displayName,
          venue: event.venue,
          uri: event.uri,
          performance: event.performance,
          date: moment(event.start.date, 'YYYY-MM-DD').format('dddd, MMMM Do'),
        }));
        resolve(internalEvents);
      })
      .catch(reason => {
        const msg = `Could not get events for location ` +
                    `${JSON.stringify(location)}: ${reason}`;
        console.error(msg);
        reject(msg);
      });
});

const getMetroAreaId = location => new Promise((resolve, reject) => {
  const onRequestFinished = (error, response, body) => {
    if (error) {
      console.error(error);
      reject(error);
      return;
    }
    checkSuccessYieldingBody(response, body)
      .then(parseJson)
      .then(json => {
        if (!json.resultsPage ||
            !json.resultsPage.results ||
            !json.resultsPage.results.location ||
            !json.resultsPage.results.location.length ||
            !json.resultsPage.results.location[0].metroArea ||
            !json.resultsPage.results.location[0].metroArea.id ||
            typeof json.resultsPage.results.location[0].metroArea.id !== 'number') {
          const msg = 'No metro area ID in result';
          console.error(msg);
          reject(msg);
        } else {
          resolve(json.resultsPage.results.location[0].metroArea.id)
        }
      })
      .catch(reason => {
        const msg = `Could not get metro area ID for location ` +
                    `${JSON.stringify(location)} using url ` +
                    `"${url}": ${reason}`;
        console.error(msg);
        reject(msg);
      });
  };
  const path = '/api/3.0/search/locations.json';
  const params = [`location=geo:${location.latitude},${location.longitude}`];
  getUrl(path, params)
    .then(url => request(url, onRequestFinished))
    .catch(reason => {
      const msg = 'Could not get metro area ID: ' + reason;
      console.error(msg);
      reject(msg);
    });
});

const getEventsForMetroAreaId = id => new Promise((resolve, reject) => {
  const path = `/api/3.0/metro_areas/${id}/calendar.json`;
  const eventsPerPage = functions.config().songkick.events_per_page || 10;
  const params = [
    `per_page=${eventsPerPage}`,
  ];
  const onRequestFinished = (error, response, body) => {
    checkSuccessYieldingBody(response, body)
      .then(parseJson)
      .then(json => {
        if (!json.resultsPage ||
            !json.resultsPage.results ||
            !json.resultsPage.results.event) {
          const msg = 'Response had no event data';
          console.error(msg);
          reject(msg);
        } else {
          resolve(json.resultsPage.results.event);
        }
      })
      .catch(reason => {
        const msg = `Could not get events for metro area ID ${id} using url` +
                    `"${url}": ${reason}`;
        console.error(msg);
        reject(msg);
      });
  };
  getUrl(path, params).then(url => request(url, onRequestFinished));
});

/**
 * Get a Songkick API URL
 * @param {string} path Path to specific version and service requested, like:
 *     "/api/3.0/search/locations.json"
 * @param {Array<string>} params Optional array of parameters as strings,
 *     already joined with equals signs as necessary, like:
 *     ['foo=bar', 'baz=quux']
 */
const getUrl = (path, params) => new Promise((resolve, reject) => {
  params = params || [];
  const apiKey = functions.config().songkick.key;
  if (!apiKey) {
    const msg = 'No Songkick API key configured at "songkick.key".' +
           '(https://firebase.google.com/docs/functions/config-env)';
    console.error(msg);
    reject(msg);
  } else {
    const url = 'http://api.songkick.com' +
        path +
        '?' + [...params, `apikey=${apiKey}`].join('&');
    resolve(url);
  }
});

/**
 * From a "request" library request, get the body if the request was successful
 * or reject otherwise with an appropriate message.
 */
const checkSuccessYieldingBody = (response, body) => new Promise((resolve, reject) => {
  if (response.statusCode !== 200) {
    const msg = `HTTP req failed:` +
        (error || 'HTTP ' + response.statusCode);
    console.error(msg);
    reject(msg);
  } else {
    resolve(body);
  }
});

/**
 * Parse to JSON or reject if invalid.
 * @param {string} text 
 */
const parseJson = (text) => new Promise((resolve, reject) => {
  try {
    resolve(JSON.parse(text));
  } catch (error) {
    const msg = `failed to parse JSON with error: ${error}.`;
    console.error(msg + ` JSON: \n${text}`);
    reject(msg);
  }
});

module.exports = {getEventsForLocation};