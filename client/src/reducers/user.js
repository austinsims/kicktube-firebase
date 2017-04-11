// @flow

import {types} from '../actions/user';
import type {FirebaseUser} from '../util/typedefs';

export default function user(state: ?FirebaseUser = null, action: Object) {
  if (action.type !== types.SET_USER) {
    return state;
  }
  return action.user;
}