// @flow

/**
 * @fileoverview A flexible container for events with a title.  Takes a
 * predicate to determine which events to show.
 */

import {connect} from 'react-redux';
import EventCard from './EventCard';
import MdExpandLess from 'react-icons/lib/md/expand-less';
import MdExpandMore from 'react-icons/lib/md/expand-more';
import React, {Component} from 'react';
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

  state: {
    expanded: boolean,
  }

  constructor() {
    super();
    this.state = {expanded: true};
  }

  render() {
    if (!this.getEventIds().length) {
      return null;
    }
    return (
      <div>
        <h2 style={{fontWeight: 'normal', marginTop: '40px'}}>
          {this.props.title}
          &nbsp;
          {this.state.expanded ?
              <MdExpandLess onClick={() => this.setState({expanded: false})}
                            style={{cursor: 'pointer' }} /> :
              <MdExpandMore onClick={() => this.setState({expanded: true})}
                            style={{cursor: 'pointer' }} />}
        </h2>
        {this.maybeRenderEvents()}
      </div>
    );
  }

  maybeRenderEvents() {
    if (!this.state.expanded) {
      return;
    }
    return this.getEventIds()
        .map((id, index) => <EventCard eventId={id} key={index}/>);
  }

  getEventIds() {
    return this.props.events.items
        .filter(this.props.eventPredicate)
        .map(event => event.id);
  }
}


export default connect(state => ({
  events: state.events,
  dislikedEventsById: state.dislikedEventsById,
}))(EventList);