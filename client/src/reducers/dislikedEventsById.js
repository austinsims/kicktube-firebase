// @flow

import {types} from '../actions/dislikedEventsById';

export default function dislikedEventsById(state: Array<number> = [], action: Object) {
  if (action.type !== types.DISLIKE_EVENT) {
    return state;
  }
  return state.concat(action.eventId);
}