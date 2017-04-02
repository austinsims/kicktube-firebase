/**
 * @param {?string} state 
 * @param {!Object} action 
 */
export default function loadingMessage(state = '', action) {
  if (action.type !== 'UPDATE_LOADING_MESSAGE') {
    return state;
  }
  return action.message;
}