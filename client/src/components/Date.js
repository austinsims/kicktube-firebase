// @flow

import React, {Component} from 'react';
import EventCard from './EventCard';
import {connect} from 'react-redux';

import type {EventsState} from '../util/typedefs';

export class Date extends Component {
  props: {
    // The date this component should show events for, represented the same as
    // in the API response as a string.
    date: string,
    // From connect
    events: EventsState,
    dislikedEventsById: Array<number>,
  };

  render() {
    const eventIds = this.props.events.items
        .filter(event => event.date === this.props.date)
        .filter(event => this.props.dislikedEventsById.indexOf(event.id) === -1)
        .map(event => event.id);
    if (!eventIds.length) {
      return null;
    }
    return (
      <div>
        <h2 style={{
            fontWeight: 'normal',
            marginTop: '40px',
          }}>{this.props.date}</h2>
        {eventIds.map((id, index) => <EventCard eventId={id}
                                                key={index}/>)}
      </div>
    );
  }
}


export default connect(state => ({
  events: state.events,
  dislikedEventsById: state.dislikedEventsById,
}))(Date);