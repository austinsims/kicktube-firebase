// @flow

import {bindActionCreators} from 'redux';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {connect} from 'react-redux';
import {dislikeEvent} from '../actions/dislikedEventsById';
import {likeEvent, unlikeEvent} from '../actions/likedEventsById';
import FlatButton from 'material-ui/FlatButton';
import MdThumbDown from 'react-icons/lib/md/thumb-down';
import MdThumbUp from 'react-icons/lib/md/thumb-up';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import type {EventsState, FirebaseUser} from '../util/typedefs';
import Video from './Video';

/**
 * Card displaying a single event, with a link to its Songkick page, the name
 * of the venue and a video if one was found.
 */
export class EventCard extends Component {
  props: {
    // From parent
    eventId: number,
    dislikeEvent: Function,
    // From connect
    likeEvent: Function,
    unlikeEvent: Function,
    events: EventsState,
    likedEventsById: Array<number>,
    dislikedEventsById: Array<number>,
    user: FirebaseUser,
  };

  render() {
    const event = this.findEvent();
    
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
    const {user, likedEventsById, dislikedEventsById} = this.props;
    if (!user) {
      return;
    }
    const event = this.findEvent();

    const eventIsLiked = likedEventsById.includes(event.id);
    const eventIsDisliked = dislikedEventsById.includes(event.id);

    const thumbsDownOpacity = eventIsLiked ? '0.2' : '1';
    const thumbsDownColor = eventIsDisliked ? 'rgb(0, 188, 212)' : 'gray';

    const thumbsUpOpacity = eventIsDisliked ? '0.2' : '1';
    const thumbsUpColor = eventIsLiked ? 'rgb(0, 188, 212)' : 'gray';
    return (
      <CardActions>
        <FlatButton label={
                      <MdThumbDown style={{
                        opacity: thumbsDownOpacity,
                        color: thumbsDownColor,
                      }} />
                    }
                    onTouchTap={() => this.thumbsDownClick()}
                    disabled={eventIsLiked} />
        <FlatButton label={
                      <MdThumbUp style={{
                        opacity: thumbsUpOpacity,
                        color: thumbsUpColor,
                      }} />
                    }
                    onTouchTap={() => this.thumbsUpClick()}
                    disabled={eventIsDisliked} />
      </CardActions>
    );
  }

  /**
   * Dislike an event.
   * TODO(adsims): Show a "trash" view where you can un-dislike disliked items.
   * Then change this to toggle, just as thumbsUpClick does.
   */
  thumbsDownClick() {
    const event = this.findEvent();
    this.props.dislikeEvent(event.id);
  }

  /**
   * Toggle the liked status.
   */
  thumbsUpClick() {
    const event = this.findEvent();
    if (this.props.likedEventsById.includes(event.id)) {
      this.props.unlikeEvent(event.id);
    } else {
      this.props.likeEvent(event.id);
    }
  }

  findEvent() {
    const {eventId} = this.props;
    const event = this.props.events.items.find(event => event.id === eventId);
    if (!event) {
      throw new Error('Could not find event for id: ' + eventId);
    }
    return event;
  }

  static childContextTypes = {
    reactIconBase: PropTypes.object
  }

  getChildContext() {
    return {
      reactIconBase: {
        color: 'gray',
        size: 24,
      }
    };
  }
}

export default connect(
  state => ({
    events: state.events,
    user: state.user,
    likedEventsById: state.likedEventsById,
    dislikedEventsById: state.dislikedEventsById,
  }),
  dispatch => bindActionCreators({
    dislikeEvent,
    likeEvent,
    unlikeEvent,
  }, dispatch),
)(EventCard);