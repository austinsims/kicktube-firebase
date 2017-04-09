// @flow

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getLocation} from '../util/location'
import {appendEvents} from '../actions/events';
import {updateLoadingMessage} from '../actions/loadingMessage';
import AppBar from 'material-ui/AppBar';
import Calendar from './Calendar';
import eventsData from '../data/events';
import LoadingMessage from './LoadingMessage';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';

import type {EventsState} from '../util/typedefs';

// Export unconnected component for unit testing.
export class App extends Component {
  props: {
    loadingMessage: string,
    events: EventsState,
    updateLoadingMessage: Function,
    appendEvents: Function,
  };
  lastRequestedPage: number;

  constructor() {
    super();
    this.lastRequestedPage = 0;
  }

  componentWillMount() {
    this.props.updateLoadingMessage('Determining your location...');
    this.requestEvents();
  }

  render() {
    return (
      <div>
        <AppBar title="Kicktube" iconElementLeft={<span></span>}/>
        <LoadingMessage />
        {<Calendar events={this.props.events} />}
        {this.maybeRenderSeeMoreButton()}
      </div>
    );
  }

  maybeRenderSeeMoreButton() {
    if (!this.props.events.length) {
      return null;
    }
    return (<div style={{padding: '30px 120px'}}>
        <RaisedButton label="SEE MORE"
                      fullWidth={true}
                      onTouchTap={() => this.requestEvents(this.lastRequestedPage++)} />
    </div>)
  }

  requestEvents(page: number = 0) {
    // TODO: Make a URL flag for this instead?
    const debugMode = window.location.host === 'localhost:3000';
    let promise;
    if (debugMode) {
      promise = new Promise((resolve) => {
        resolve(eventsData);
      });
    } else {
      promise = new Promise((resolve, reject) => {
        getLocation()
          .then(location => getUrlForLocationAndPage(location, page))
          .then(url => {
            this.props.updateLoadingMessage('Fetching events near you...');
            return fetch(url);
          })
          .then(checkRespOkYieldingText)
          .then(parseJson)
          .then(resolve);
      });
    }

    promise.then(events => {
      this.props.updateLoadingMessage('');
      this.props.appendEvents(events);
    })
    .catch(reason => {
      const msg = 'Unfortunately, an error occurred' + (debugMode ? ': ' + reason : ' :( ');
      this.props.updateLoadingMessage(msg);
    });
  }
}

const HOST = 'https://us-central1-kicktube-87085.cloudfunctions.net';
const getUrlForLocationAndPage = (location, page) => HOST +
    `/events?latitude=${location.latitude}&longitude=${location.longitude}&page=${page}`;

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

// Export connected component for use by index.js.
export default connect(
  state => ({loadingMessage: state.loadingMessage, events: state.events}),
  dispatch => bindActionCreators({updateLoadingMessage, appendEvents}, dispatch),
)(App);
