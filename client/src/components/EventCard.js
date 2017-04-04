import {Card, CardHeader, CardText, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import React, {Component} from 'react';
import Video from './Video';

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
        <Video event={event}
                  index={this.props.index} />
      </CardText>
    );
  }
}

export default EventCard;