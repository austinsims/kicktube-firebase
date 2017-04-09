// @flow
import type {SongkickEvent} from '../util/typedefs';
import {types} from '../actions/events';

export default function events(state: Array<SongkickEvent> = [], action: Object) {
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

function appendEvents(state: Array<SongkickEvent>, action: Object) {
  return state.concat(action.events);
}

/**
 * Play the video with given YouTube video id, and stop all others.
 */
function playVideoByYoutubeId(state: Array<SongkickEvent>, action: Object) {
  return state.map(event => ({
    ...event,
    videoIsPlaying: event.videoId === action.youtubeId
  }));
}

function playVideoOfNextEventIfPresent(state: Array<SongkickEvent>, action: Object) {
  const currentlyPlayingVideo = state.find(event => event.videoIsPlaying);
  if (!currentlyPlayingVideo) {
    return state;
  }

  // TODO: Polyfill and use Array.prototype.indexOf
  const currentlyPlayingIndex = state.indexOf(currentlyPlayingVideo);
  const nextEventWithVideo = state.find(
      (event, index) => !!event.videoId && index > currentlyPlayingIndex);
  if (!nextEventWithVideo) {
    return state.map(event => ({...event, videoIsPlaying: false}));
  }

  const indexToPlay = state.indexOf(nextEventWithVideo);
  return state.map((event, index) => ({
    ...event,
    videoIsPlaying: index === indexToPlay,
  }));
}

function stopVideoPlayback(state: Array<SongkickEvent>) {
  return state.map(event => ({...event, videoIsPlaying: false}));
}