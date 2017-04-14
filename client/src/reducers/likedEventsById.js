// @flow

import {types} from '../actions/likedEventsById';

export default function likedEventsById(state: Array<number> = [], action: Object) {
  switch (action.type) {
    case types.LIKE_EVENT:
      return state.concat(action.eventId);
    case types.UNLIKE_EVENT:
      return state.filter(id => id !== action.eventId);
    default:
      return state;
  }
}