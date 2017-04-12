// @flow

import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import firebase from 'firebase';
import FlatButton from 'material-ui/FlatButton';
import React, {Component} from 'react';

export class KicktubeAppBar extends Component {
  render() {
    return (
      <AppBar title="Kicktube"
              iconElementLeft={<span></span>}
              iconElementRight={this.renderLoginStuff()}/>
    );
  }

  renderLoginStuff() {
    const {user} = this.props;
    if (user) {
      return user.photoURL ?
          <Avatar src={user.photoURL} size={48} /> :
          <span>Welcome, {this.props.user.displayName}</span>;
    } else {
      return (
        <FlatButton label="LOGIN" onTouchTap={() => this.signIn()}/>
      );
    }
  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    // TODO(adsims)
  }
}

export default connect(
  state => ({user: state.user}),
)(KicktubeAppBar);