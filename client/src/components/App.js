// @flow

import Calendar from './Calendar';
import eventsData from '../data/events';
import KicktubeAppBar from './KicktubeAppBar';
import LoadingMessage from './LoadingMessage';
import React, { Component } from 'react';
import SeeMoreButton from './SeeMoreButton';

class App extends Component {
  render() {
    return (
      <div>
        <KicktubeAppBar />
        <LoadingMessage />
        <Calendar events={this.props.events} />
        <SeeMoreButton />
      </div>
    );
  }
}

export default App;