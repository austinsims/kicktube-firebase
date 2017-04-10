// @flow

import AppBar from 'material-ui/AppBar';
import Calendar from './Calendar';
import eventsData from '../data/events';
import LoadingMessage from './LoadingMessage';
import React, { Component } from 'react';
import SeeMoreButton from './SeeMoreButton';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="Kicktube" iconElementLeft={<span></span>}/>
        <LoadingMessage />
        <Calendar events={this.props.events} />
        <SeeMoreButton />
      </div>
    );
  }
}

export default App;