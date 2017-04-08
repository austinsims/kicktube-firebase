// @flow
import type {Event} from '../util/typedefs';

export const types = {
  APPEND_EVENTS: 'APPEND_EVENTS',
  PLAY_VIDEO_BY_YOUTUBE_ID: 'PLAY_VIDEO_BY_YOUTUBE_ID',
  PLAY_NEXT_VIDEO: 'PLAY_NEXT_VIDEO',
  STOP_VIDEO_PLAYBACK: 'STOP_VIDEO_PLAYBACK',
};

export function appendEvents(events: Array<Event>) {
  return {
    type: types.APPEND_EVENTS,
    events,
  }
}

export function playVideoByYoutubeId(youtubeId: string) {
  return {
    type: types.PLAY_VIDEO_BY_YOUTUBE_ID,
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
    type: types.PLAY_NEXT_VIDEO,
  }
}

/**
 * Stop video playback.
 */
export function stopVideoPlayback() {
  return {
    type: types.STOP_VIDEO_PLAYBACK,
  }
}