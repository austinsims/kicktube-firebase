// @flow

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {fetchEvents} from '../actions/events';
import {getLocation} from '../util/location';

import type {EventsState} from '../util/typedefs';

export class SeeMoreButton extends React.Component {
  props: {
    events: EventsState,
    fetchEvents: Function,
  };
  lastRequestedPage: number = 1;

  render() {
    if (!this.props.events.items.length) {
      return null;
    }

    if (!!this.props.loadingMessage) {
      return null;
    }

    if (this.props.events.isFetching) {
      return this.renderSpinner();
    }

    return this.renderButton();
  }

  renderButton() {
    return (
      <div style={{padding: '30px 120px'}}>
        <RaisedButton label="SEE MORE"
                      fullWidth={true}
                      onTouchTap={() => this.onButtonClick()} />
      </div>
    );
  }

  renderSpinner() {
    const sizePx = 40;
    return (
      <div style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: `${sizePx}px`,
          padding: '30px 0',
        }}>
        <CircularProgress size={sizePx}/>
      </div>
    );
  }

  onButtonClick() {
    getLocation()
        .then(location => this.props.fetchEvents(location, this.lastRequestedPage++));
  }
}

export default connect(
  state => ({
    events: state.events,
    loadingMessage: state.loadingMessage,
  }),
  dispatch => bindActionCreators({fetchEvents}, dispatch),
)(SeeMoreButton);