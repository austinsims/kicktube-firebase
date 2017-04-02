/**
 * @param {?string} message 
 */
export function updateLoadingMessage(message) {
  return {
    type: 'UPDATE_LOADING_MESSAGE',
    message,
  }
}
