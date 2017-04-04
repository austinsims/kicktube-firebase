import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getLocation} from '../util/location'
import {setEvents} from '../actions/events';
import {updateLoadingMessage} from '../actions/loadingMessage';
import AppBar from 'material-ui/AppBar';
import eventsData from '../data/events';
import EventTable from './EventTable';
import React, { Component } from 'react';

class App extends Component {
  componentWillMount() {
    this.props.updateLoadingMessage('Determining your location...');
    this.props.setEvents(null);
    this.requestEvents();
  }

  render() {
    return (
      <div>
        <AppBar title="Kicktube" iconElementLeft={<span></span>}/>
        {this.props.loadingMessage || ''}
        {this.props.events && <EventTable events={this.props.events} />}
      </div>
    );
  }

  requestEvents() {
    // TODO: Make a URL flag for this instead?
    const debugMode = window.location.host.includes('localhost');
    let promise;
    if (debugMode) {
      promise = new Promise((resolve) => {
        resolve(eventsData);
      });
    } else {
      promise = new Promise((resolve, reject) => {
        getLocation()
          .then(getUrlForLocation)
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
      this.props.updateLoadingMessage(null);
      this.props.setEvents(events);
    })
    .catch(reason => {
      const msg = 'Unfortunately, an error occurred: ' + reason;
      this.props.updateLoadingMessage(msg);
    });
  }
}

App.propTypes = {
  loadingMessage: React.PropTypes.string,
  events: React.PropTypes.array,
  updateLoadingMessage: React.PropTypes.func.isRequired,
  setEvents: React.PropTypes.func.isRequired,
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

export default connect(
  state => ({loadingMessage: state.loadingMessage, events: state.events}),
  dispatch => bindActionCreators({updateLoadingMessage, setEvents}, dispatch),
)(App);
