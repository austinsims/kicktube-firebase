// @flow

/**
 * @fileoverview A flexible container for events with a title.  Takes a
 * predicate to determine which events to show.
 */

import React, {Component} from 'react';
import EventCard from './EventCard';
import {connect} from 'react-redux';
import type {SongkickEvent} from '../util/typedefs';

import type {EventsState} from '../util/typedefs';

export class EventList extends Component {
  props: {
    // The date this component should show events for, represented the same as
    // in the API response as a string.
    title: string,
    eventPredicate: (SongkickEvent) => boolean,
    // From connect
    events: EventsState,
  };

  render() {
    const eventIds = this.props.events.items
        .filter(this.props.eventPredicate)
        .map(event => event.id);
    if (!eventIds.length) {
      return null;
    }
    return (
      <div>
        <h2 style={{
            fontWeight: 'normal',
            marginTop: '40px',
          }}>{this.props.title}</h2>
        {eventIds.map((id, index) => <EventCard eventId={id}
                                                key={index}/>)}
      </div>
    );
  }
}


export default connect(state => ({
  events: state.events,
  dislikedEventsById: state.dislikedEventsById,
}))(EventList);