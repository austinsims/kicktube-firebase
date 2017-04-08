// @flow

export default function loadingMessage(state: string = '', action: Object) {
  if (action.type !== 'UPDATE_LOADING_MESSAGE') {
    return state;
  }
  return action.message;
}