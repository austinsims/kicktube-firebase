import './EventTable.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import TableRow from './TableRow';

import {
  playVideoOfNextEventIfPresent
} from '../actions/events';


class EventTable extends Component {
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
    }
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
            {this.props.events.map((event, index) =>
                <TableRow event={event} key={index} index={index}/>)}
          </tbody>
        </table>
        {/* TODO: Pagination */}
      </div>
    );
  }
}
EventTable.propTypes = {
  playVideoOfNextEventIfPresent: React.PropTypes.func.isRequired,
}

export default connect(
  state => ({playingVideoIndex: state.playingVideoIndex}),
  dispatch => bindActionCreators({
    playVideoOfNextEventIfPresent,
  }, dispatch)
)(EventTable);

