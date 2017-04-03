import React, {Component} from 'react';
import VideoTd from './VideoTd';

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.event.date}</td>
        <td>{this.props.event.displayName}</td>
        <td>{this.props.event.venue.displayName}</td>
        <td><a href={this.props.event.uri} target={'_blank'}>GO!</a></td>
        <VideoTd event={this.props.event}
                 index={this.props.index} />
      </tr>
    );
  }
}

export default TableRow;