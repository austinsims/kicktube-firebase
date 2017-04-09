// @flow

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import YouTube from 'react-youtube';

import type {EventsState} from '../util/typedefs';

import {
  playVideoByYoutubeId,
  playVideoOfNextEventIfPresent,
} from '../actions/events';

export class Video extends Component {
  props: {
    // From parent component
    youtubeVideoId: string,
    // From connect
    playVideoByYoutubeId: Function,
    playVideoOfNextEventIfPresent: Function,
    events: EventsState,
  };

  render() {
    const event = this.props.events.items.find(
        event => event.videoId === this.props.youtubeVideoId);
    if (!event) {
      throw new Error('Video component could not find event for id: ' +
          this.props.youtubeVideoId);
    }

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

export default connect(
  state => ({events: state.events}),
  dispatch => bindActionCreators({
    playVideoByYoutubeId,
    playVideoOfNextEventIfPresent,
  }, dispatch),
)(Video);