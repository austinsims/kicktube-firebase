// @flow

import {connect} from 'react-redux';
import EventList from './EventList';
import React, {Component} from 'react';
import type {SongkickEvent} from '../util/typedefs';


export class LikedEvents extends Component {
  props: {
    likedEventsById: Array<number>,
  }

  render() {
    if (!this.props.likedEventsById.length) {
      return null;
    }
    return <EventList title={'Liked'}
                      eventPredicate={this.eventPredicate.bind(this)} />;
  }

  eventPredicate(event: SongkickEvent): boolean {
    return this.props.likedEventsById.indexOf(event.id) >= 0;
  }
}

export default connect(
  state => ({likedEventsById: state.likedEventsById}),
)(LikedEvents);