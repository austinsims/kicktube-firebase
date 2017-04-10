// @flow

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getLocation} from '../util/location'
import {fetchEvents} from '../actions/events';
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
    events: EventsState,
    fetchEvents: Function,
  };
  lastRequestedPage: number;

  constructor() {
    super();
    this.lastRequestedPage = 1;
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
    if (!this.props.events.items.length) {
      return null;
    }
    return (<div style={{padding: '30px 120px'}}>
        <RaisedButton label="SEE MORE"
                      fullWidth={true}
                      onTouchTap={() => this.onSeeMoreButtonClick()} />
    </div>)
  }

  onSeeMoreButtonClick() {
    getLocation()
        .then(location => this.props.fetchEvents(location, this.lastRequestedPage++));
    
  }
}

// Export connected component for use by index.js.
export default connect(
  state => ({loadingMessage: state.loadingMessage, events: state.events}),
  dispatch => bindActionCreators({fetchEvents}, dispatch),
)(App);
