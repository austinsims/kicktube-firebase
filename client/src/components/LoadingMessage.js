import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import React, {Component} from 'react';

class LoadingMessage extends Component {
  render() {
    if (!this.props.loadingMessage) {
      return null;
    }
    return (<div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '100px',
        }}>
      <CircularProgress size={40} />
      <div style={{
          lineHeight: '40px',
          height: '40px',
          textAlign: 'center',
          display: 'inline-block',
          marginLeft: '20px',
        }}>{this.props.loadingMessage}</div>
    </div>)
  }
}

LoadingMessage.propTypes = {
  loadingMessage: React.PropTypes.string,
}

export default connect(state => ({
  loadingMessage: state.loadingMessage,
}))(LoadingMessage);