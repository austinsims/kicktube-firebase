import React, {Component} from 'react';
import YouTube from 'react-youtube';
import './EventTable.css';
import {connect} from 'react-redux';
import {
  playNextVideo,
  playPrevVideo,
  stopVideoPlayback,
  playVideoAtIndex,
} from '../actions/playingVideoIndex';
import {bindActionCreators} from 'redux';

class EventTable extends Component {
  componentWillMount() {
  }
  componentDidMount() {
    this.boundKeyDownListener = this.onKeyDown.bind(this);
    window.addEventListener('keydown', this.boundKeyDownListener);
  }
  componentWillUnmount() {
    if (this.boundKeyDownListener) {
      window.removeEventListener('keydown', this.boundKeyDownListener);
    }
  }
  playVideo(index) {
    this.props.playVideoAtIndex(index);
  }
  onKeyDown(event) {
    if (event.keyCode === 39 /* right arrow */) {
      this.maybePlayNextVideo();
    } else if (event.keyCode === 37 /* left arrow */) {
      this.maybePlayPrevVideo();
    }
  }
  maybePlayNextVideo() {
    // Don't do anything if a video isn't playing.
    if (this.props.playingVideoIndex === null) {
      return;
    }

    // Try to find another appropriate event with a video.
    const events = this.props.events;
    const nextEventWithVideo = events.find((event, index) =>
        !!event.videoId &&
        index > this.props.playingVideoIndex);
    if (!nextEventWithVideo) {
      return;
    }

    // Play it if found.
    const newIndex = events.indexOf(nextEventWithVideo);
    this.props.playVideoAtIndex(newIndex);
  }
  maybePlayPrevVideo() {
    // TODO
  }
  render() {
    return (
      <div>
        <table className="EventTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Artists</th>
              <th>Venue</th>
              <th>Link</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.events.map((event, index) => {
                const playing = index === this.props.playingVideoIndex;
                return (<TableRow event={event}
                                  playing={playing}
                                  key={index}
                                  index={index}
                                  playVideo={this.playVideo.bind(this)}/>)
              })
            }
          </tbody>
        </table>
        {/* TODO: Pagination */}
      </div>
    );
  }
}
EventTable.propTypes = {
  playNextVideo: React.PropTypes.func.isRequired,
  playPrevVideo: React.PropTypes.func.isRequired,
  stopVideoPlayback: React.PropTypes.func.isRequired,
  playVideoAtIndex: React.PropTypes.func.isRequired,
  playingVideoIndex: React.PropTypes.number,
}

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.event.date}</td>
        <td>{this.props.event.displayName}</td>
        <td>{this.props.event.venue.displayName}</td>
        <td><a href={this.props.event.uri} target={'_blank'}>GO!</a></td>
        <VideoTd event={this.props.event}
                 playing={this.props.playing}
                 index={this.props.index}
                 playVideo={this.props.playVideo} />
      </tr>
    );
  }
}

class VideoTd extends Component {
  render() {
    const playing = this.props.playing;
    const event = this.props.event;
    const opts = {
      height: '240',
      width: '400',
      playerVars: {autoplay: 1},
    };

    return (
      <td>
        {playing &&
             <YouTube videoId={event.videoId}
                      opts={opts}/>}

        {!playing &&
             event.videoThumbnailUrl &&
             <img src={event.videoThumbnailUrl}
                  onClick={() => this.props.playVideo(this.props.index)}/>}

        {!playing &&
             !event.videoThumbnailUrl &&
             'No video found'}
      </td>
    );
  }
}

export default connect(
  state => ({playingVideoIndex: state.playingVideoIndex}),
  dispatch => bindActionCreators({
    playNextVideo,
    playPrevVideo,
    stopVideoPlayback,
    playVideoAtIndex,
  }, dispatch)
)(EventTable);

