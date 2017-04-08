// @flow
import type {Event} from '../util/typedefs';

export function appendEvents(events: Array<Event>) {
  return {
    type: 'APPEND_EVENTS',
    events,
  }
}

export function playVideoByYoutubeId(youtubeId: string) {
  return {
    type: 'PLAY_VIDEO_BY_YOUTUBE_ID',
    youtubeId,
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

/**
 * Stop video playback.
 */
export function stopVideoPlayback() {
  return {
    type: 'STOP_VIDEO_PLAYBACK',
  }
}