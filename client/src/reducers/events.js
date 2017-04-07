export default function events(state = null, action) {
  switch (action.type) {
    case 'APPEND_EVENTS':
      return appendEvents(state, action);
    case 'PLAY_VIDEO_BY_YOUTUBE_ID':
      return playVideoByYoutubeId(state, action);
    case 'PLAY_NEXT_VIDEO':
      return playVideoOfNextEventIfPresent(state, action);
    case 'STOP_VIDEO_PLAYBACK':
      return stopVideoPlayback(state);
    default:
      return state;
  }
  return action.events;
}

/**
 * @param {?Array} state 
 * @param {!Object} action 
 */
function appendEvents(state, action) {
  if (state && action.events) {
    return state.concat(action.events);
  }
  return action.events;
}

/**
 * Play the video with given YouTube video id, and stop all others.
 * @param {?Array} state 
 * @param {!Object} action 
 */
function playVideoByYoutubeId(state, action) {
  return Array.from(state).map(event => {
    event.videoIsPlaying = event.videoId === action.youtubeId;
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

function stopVideoPlayback(state) {
  return state ? 
           state.map(event => ({...event, videoIsPlaying: false})) :
           state;
}