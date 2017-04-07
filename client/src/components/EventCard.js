import {Card, CardHeader, CardText, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import React, {Component} from 'react';
import Video from './Video';

/**
 * Card displaying a single event, with a link to its Songkick page, the name
 * of the venue and a video if one was found.
 */
class EventCard extends Component {
  render() {
    const {event} = this.props;
    return (
      <Card containerStyle={{margin: '15px'}}>
        <CardHeader
          title={<a href={event.uri}>{event.displayName}</a>} 
          subtitle={event.venue.displayName}/>
          {this.maybeRenderCardText()}
      </Card>
    );
  }

  maybeRenderCardText() {
    const {event} = this.props;
    if (!event.videoThumbnailUrl) {
      return null;
    }
    return (
      <CardText>
        <Video youtubeVideoId={event.videoId}/>
      </CardText>
    );
  }
}

export default EventCard;