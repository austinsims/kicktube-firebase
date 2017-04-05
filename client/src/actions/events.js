/**
 * @param {?Array} events 
 */
export function appendEvents(events) {
  return {
    type: 'APPEND_EVENTS',
    events,
  }
}

export function playVideoAtIndex(index) {
  return {
    type: 'PLAY_VIDEO_AT_INDEX',
    index,
  }
}

/**
 * Plays the video for the event after to this one, if there is such an event
 * and that event has a video.  Otherwise, stops playback.  Does nothing if
 * a video is not already playing.
 */
export function playVideoOfNextEventIfPresent() {
  return {
    type: 'PLAY_NEXT_VIDEO',
  }
}