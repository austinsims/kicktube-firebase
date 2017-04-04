import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {playVideoAtIndex} from '../actions/events';
import React, {Component} from 'react';
import YouTube from 'react-youtube';

class Video extends Component {
  render() {
    const event = this.props.events[this.props.index];
    const opts = {
      height: '240',
      width: '400',
      playerVars: {autoplay: 1},
    };
    return (
      <div>
        {!!event.videoIsPlaying &&
             <YouTube videoId={event.videoId}
                      opts={opts}/>}

        {!event.videoIsPlaying &&
             event.videoThumbnailUrl &&
             <img src={event.videoThumbnailUrl}
                  onClick={() => this.props.playVideoAtIndex(this.props.index)}/>}
      </div>
    );
  }
}

Video.propTypes = {
  // From parent component
  index: React.PropTypes.number.isRequired,
  // From connect
  playVideoAtIndex: React.PropTypes.func.isRequired,
  events: React.PropTypes.array.isRequired,
}

export default connect(
  state => ({events: state.events}),
  dispatch => bindActionCreators({playVideoAtIndex}, dispatch),
)(Video);