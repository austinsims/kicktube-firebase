import React, {Component} from 'react';
import EventCard from './EventCard';
import {connect} from 'react-redux';

class Date extends Component {
  render() {
    return (<div>
      <h2 style={{
          fontWeight: 'normal',
          marginTop: '40px',
        }}>{this.props.date}</h2>
      {this.props.events
          .filter(event => event.date === this.props.date)
          .map((event, index) => <EventCard event={event}
                                            key={index}
                                            index={index}/>)}
    </div>);
  }
}

Date.propTypes = {
  // The date this component should show events for, represented the same as
  // in the API response as a string.
  date: React.PropTypes.string.isRequired,
  // From connect
  events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

export default connect(state => ({events: state.events}))(Date);