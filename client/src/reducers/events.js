export default function events(state = null, action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return setEvents(state, action);
    case 'PLAY_VIDEO_AT_INDEX':
      return playVideoAtIndex(state, action);
    case 'PLAY_NEXT_VIDEO':
      return playVideoOfNextEventIfPresent(state, action);
    default:
      return state;
  }
  return action.events;
}

/**
 * @param {?Array} state 
 * @param {!Object} action 
 */
function setEvents(state, action) {
  return action.events;
}

/**
 * Play the video at "index", and stop all others.
 * @param {?Array} state 
 * @param {!Object} action 
 */
function playVideoAtIndex(state, action) {
  const indexToPlay = action.index;
  return Array.from(state).map((event, index) => {
    event.videoIsPlaying = index === indexToPlay;
    return event;
  });
}

/**
 * @param {?Array} state 
 * @param {Object} action 
 */
function playVideoOfNextEventIfPresent(state, action) {
  if (!state || !state.length) {
    return state;
  }

  const currentlyPlayingVideo = state.find(event => event.videoIsPlaying);
  if (!currentlyPlayingVideo) {
    return state;
  }

  // TODO: Polyfill and use Array.prototype.indexOf
  const currentlyPlayingIndex = state.indexOf(currentlyPlayingVideo);
  const nextEventWithVideo = state.find(
      (event, index) => !!event.videoId && index > currentlyPlayingIndex);
  if (!nextEventWithVideo) {
    return state;
  }

  const indexToPlay = state.indexOf(nextEventWithVideo);
  return Array.from(state)
      .map((event, index) => {
        event.videoIsPlaying = index === indexToPlay
        return event;
      });
}