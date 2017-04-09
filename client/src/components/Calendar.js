// @flow

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Date from './Date';
import EventCard from './EventCard';
import React, {Component} from 'react';

import type {EventsState} from '../util/typedefs';

import {
  playVideoOfNextEventIfPresent,
  stopVideoPlayback,
} from '../actions/events';


// Export unconnected component for unit testing.
export class Calendar extends Component {
  props: {
    events: EventsState,
    playVideoOfNextEventIfPresent: Function,
    stopVideoPlayback: Function,
  };
  boundKeyDownListener: ?Function;

  componentDidMount() {
    this.boundKeyDownListener = this.onKeyDown.bind(this);
    window.addEventListener('keydown', this.boundKeyDownListener);
  }
  componentWillUnmount() {
    if (this.boundKeyDownListener) {
      window.removeEventListener('keydown', this.boundKeyDownListener);
    }
  }
  onKeyDown(event: Event) {
    if (event.keyCode === 39 /* right arrow */) {
      this.props.playVideoOfNextEventIfPresent();
    } else if (event.keyCode === 37 /* left arrow */) {
      // TODO
    } else if (event.keyCode === 27 /* escape */) {
      this.props.stopVideoPlayback();
    }
  }
  render() {
    const dates = new Set(this.props.events.items.map(event => event.date));
    return (
      <div style={{padding: '0 15px'}}>
        {[...dates].map((date, index) => <Date date={date} key={index} />)}
      </div>
    );
  }
}

// Export connected component for use by parent component.
export default connect(
  state => ({playingVideoIndex: state.playingVideoIndex}),
  dispatch => bindActionCreators({
    playVideoOfNextEventIfPresent,
    stopVideoPlayback,
  }, dispatch)
)(Calendar);

