// @flow

import type {FirebaseUser} from '../util/typedefs';

export const types = {
  SET_USER: 'SET_USER',
};

export function setUser(user: FirebaseUser) {
  return {
    type: types.SET_USER,
    user,
  }
}