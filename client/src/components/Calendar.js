import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Date from './Date';
import EventCard from './EventCard';
import React, {Component} from 'react';

import {
  playVideoOfNextEventIfPresent,
  stopVideoPlayback,
} from '../actions/events';


class Calendar extends Component {
  componentDidMount() {
    this.boundKeyDownListener = this.onKeyDown.bind(this);
    window.addEventListener('keydown', this.boundKeyDownListener);
  }
  componentWillUnmount() {
    if (this.boundKeyDownListener) {
      window.removeEventListener('keydown', this.boundKeyDownListener);
    }
  }
  onKeyDown(event) {
    if (event.keyCode === 39 /* right arrow */) {
      this.props.playVideoOfNextEventIfPresent();
    } else if (event.keyCode === 37 /* left arrow */) {
      // TODO
    } else if (event.keyCode === 27 /* escape */) {
      this.props.stopVideoPlayback();
    }
  }
  render() {
    const dates = new Set(this.props.events.map(event => event.date));
    return (
      <div style={{padding: '0 15px'}}>
        {[...dates].map((date, index) => <Date date={date} key={index} />)}
      </div>
    );
  }
}
Calendar.propTypes = {
  playVideoOfNextEventIfPresent: React.PropTypes.func.isRequired,
  stopVideoPlayback: React.PropTypes.func.isRequired,
}

export default connect(
  state => ({playingVideoIndex: state.playingVideoIndex}),
  dispatch => bindActionCreators({
    playVideoOfNextEventIfPresent,
    stopVideoPlayback,
  }, dispatch)
)(Calendar);

