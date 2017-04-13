// @flow

import {bindActionCreators} from 'redux';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {connect} from 'react-redux';
import {dislikeEvent} from '../actions/dislikedEventsById';
import FlatButton from 'material-ui/FlatButton';
import React, {Component} from 'react';
import type {EventsState} from '../util/typedefs';
import Video from './Video';
import firebase from 'firebase';

/**
 * Card displaying a single event, with a link to its Songkick page, the name
 * of the venue and a video if one was found.
 */
export class EventCard extends Component {
  props: {
    events: EventsState,
    dislikedEventsById: Array<number>,
    eventId: number,
    dislikeEvent: Function,
  };

  render() {
    const event = this.findEvent();
    if (this.props.dislikedEventsById.indexOf(event.id) >= 0) {
      return null;
    }
    
    return (
      <Card containerStyle={{margin: '15px'}}>
        <CardHeader
          title={<a href={event.uri} target="_blank">{event.displayName}</a>} 
          subtitle={event.venue.displayName}/>
          {this.maybeRenderCardText()}
          {this.maybeRenderCardActions()}
      </Card>
    );
  }

  maybeRenderCardText() {
    const event = this.findEvent();
    if (!event.videoThumbnailUrl) {
      return null;
    }
    return (
      <CardText>
        <Video youtubeVideoId={event.videoId}/>
      </CardText>
    );
  }

  maybeRenderCardActions() {
    if (!this.props.user) {
      return;
    }
    return (
      <CardActions>
        <FlatButton label="DISLIKE" onTouchTap={() => this.dislikeEvent()} />
      </CardActions>
    );
  }

  dislikeEvent() {
    const event = this.findEvent();
    this.props.dislikeEvent(event.id);
  }

  findEvent() {
    const {eventId} = this.props;
    const event = this.props.events.items.find(event => event.id === eventId);
    if (!event) {
      throw new Error('Could not find event for id: ' + eventId);
    }
    return event;
  }
}

export default connect(
  state => ({
    events: state.events,
    dislikedEventsById: state.dislikedEventsById,
    user: state.user,
  }),
  dispatch => bindActionCreators({dislikeEvent}, dispatch),
)(EventCard);