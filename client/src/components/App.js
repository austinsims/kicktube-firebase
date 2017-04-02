import React, { Component } from 'react';
import './App.css';
import EventTable from './EventTable';
import {getLocation} from '../util/location'

class App extends Component {
  componentWillMount() {
    this.setState({
      events: null,
      loadingMessage: 'Determining your location...',
    });
    getLocation()
      .then(getUrlForLocation)
      .then(url => {
        this.setState({
          loadingMessage: 'Fetching events near you...',
        });
        return fetch(url);
      })
      .then(checkRespOkYieldingText)
      .then(parseJson)
      .then(events => {
        this.setState({
          events,
          loadingMessage: null,
        });
      })
      .catch(reason => {
        this.setState({
          loadingMessage: 'Unfortunately, an error occurred: ' + reason,
        })
      });
  }
  render() {
    return (
      <div>
        <h1>Kicktube</h1>
        <h3>a mashup of Songkick and Youtube</h3>
        {this.state.loadingMessage || ''}
        {this.state.events && <EventTable events={this.state.events} />}
        {/* TODO: Don't forget requried Songkick attribution footer. */}
      </div>
    );
  }
}

const HOST = 'https://us-central1-kicktube-87085.cloudfunctions.net';
const getUrlForLocation = location => HOST +
    `/events?latitude=${location.latitude}&longitude=${location.longitude}`;

/**
 * Parse to JSON or reject if invalid.
 * @param {string} text 
 */
const parseJson = (text) => new Promise((resolve, reject) => {
  try {
    resolve(JSON.parse(text));
  } catch (error) {
    reject('failed to parse JSON: ' + error);
  }
});

const checkRespOkYieldingText = (response) => new Promise((resolve, reject) => {
  response.text().then(text => {
    if (response.ok) {
      resolve(text);
    } else {
      reject(`Fetch response not OK: HTTP ${response.status}: ${text}`);
    }
  });
})

export default App;
