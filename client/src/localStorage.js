// @flow

import type {ReduxState} from './util/typedefs';

const KEY = 'kicktube';

export function loadState(): ReduxState {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
}

export function saveState(state: ReduxState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (err) {
    console.error(err);
  }
}