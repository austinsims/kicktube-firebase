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
  };

  render() {
    return (<div>
      <h2 style={{
          fontWeight: 'normal',
          marginTop: '40px',
        }}>{this.props.date}</h2>
      {this.props.events.items
          .filter(event => event.date === this.props.date)
          .map((event, index) => <EventCard event={event}
                                            key={index}
                                            index={index}/>)}
    </div>);
  }
}


export default connect(state => ({events: state.events}))(Date);