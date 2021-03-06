// @flow

import {connect} from 'react-redux';
import EventList from './EventList';
import React, {Component} from 'react';
import type {SongkickEvent} from '../util/typedefs';


export class Date extends Component {
  props: {
    date: string,
    dislikedEventsById: Array<number>,
  }

  render() {
    return <EventList title={this.props.date}
                      eventPredicate={this.eventPredicate.bind(this)} />;
  }

  eventPredicate(event: SongkickEvent): boolean {
    return event.date === this.props.date &&
        this.props.dislikedEventsById.indexOf(event.id) === -1;
  }
}

export default connect(
  state => ({dislikedEventsById: state.dislikedEventsById}),
)(Date);