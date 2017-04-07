import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import YouTube from 'react-youtube';

import {
  playVideoByYoutubeId,
  playVideoOfNextEventIfPresent,
} from '../actions/events';

class Video extends Component {
  render() {
    const event = this.props.events.find(event => event.videoId === this.props.youtubeVideoId);
    const opts = {
      height: '240',
      width: '400',
      playerVars: {autoplay: 1},
    };
    return (
      <div>
        {!!event.videoIsPlaying &&
             <YouTube videoId={event.videoId}
                      onEnd={this.props.playVideoOfNextEventIfPresent}
                      opts={opts}/>}

        {!event.videoIsPlaying &&
             event.videoThumbnailUrl &&
             <img src={event.videoThumbnailUrl}
                  onClick={() => this.props.playVideoByYoutubeId(this.props.youtubeVideoId)}/>}
      </div>
    );
  }
}

Video.propTypes = {
  // From parent component
  youtubeVideoId: React.PropTypes.string.isRequired,
  // From connect
  playVideoByYoutubeId: React.PropTypes.func.isRequired,
  playVideoOfNextEventIfPresent: React.PropTypes.func.isRequired,
  events: React.PropTypes.array.isRequired,
}

export default connect(
  state => ({events: state.events}),
  dispatch => bindActionCreators({
    playVideoByYoutubeId,
    playVideoOfNextEventIfPresent,
  }, dispatch),
)(Video);