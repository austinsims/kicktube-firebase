// @flow
import type {Event} from '../util/typedefs';
import {types} from '../actions/events';

export default function events(state: Array<Event> = [], action: Object) {
  switch (action.type) {
    case types.APPEND_EVENTS:
      return appendEvents(state, action);
    case types.PLAY_VIDEO_BY_YOUTUBE_ID:
      return playVideoByYoutubeId(state, action);
    case types.PLAY_NEXT_VIDEO:
      return playVideoOfNextEventIfPresent(state, action);
    case types.STOP_VIDEO_PLAYBACK:
      return stopVideoPlayback(state);
    default:
      return state;
  }
}

function appendEvents(state: Array<Event>, action: Object) {
  return state.concat(action.events);
}

/**
 * Play the video with given YouTube video id, and stop all others.
 */
function playVideoByYoutubeId(state: Array<Event>, action: Object) {
  return Array.from(state).map(event => {
    event.videoIsPlaying = event.videoId === action.youtubeId;
    return event;
  });
}

function playVideoOfNextEventIfPresent(state: Array<Event>, action: Object) {
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

function stopVideoPlayback(state: Array<Event>) {
  return state.map(event => ({...event, videoIsPlaying: false}))
}