/**
 * @param {?number} state 
 * @param {!Object} action 
 */
export default function playingVideoIndex(state = null, action) {
  switch (action.type) {
    case 'PLAY_NEXT_VIDEO':
      return state;
    case 'PLAY_PREV_VIDEO':
      return state;
    case 'STOP_VIDEO_PLAYBACK':
      return state;
    case 'PLAY_VIDEO_AT_INDEX':
      return playVideoAtIndex(action.index);
    default:
      return state;
  }
}

/**
 * @param {!number} index 
 */
function playVideoAtIndex(index) {
  return index;
}