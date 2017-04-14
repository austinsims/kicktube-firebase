// @flow
import type {EventsState} from '../util/typedefs';
import {types} from '../actions/events';

export const defaultEventsState = {items: [], isFetching: false};

export default function events(state: EventsState = defaultEventsState, action: Object): EventsState {
  switch (action.type) {
    case types.APPEND_EVENTS:
      return appendEvents(state, action);
    case types.PLAY_VIDEO_BY_YOUTUBE_ID:
      return playVideoByYoutubeId(state, action);
    case types.PLAY_NEXT_VIDEO:
      return playVideoOfNextEventIfPresent(state, action);
    case types.STOP_VIDEO_PLAYBACK:
      return stopVideoPlayback(state);
    case types.REQUEST_EVENTS:
      return requestEvents(state, action);
    case types.RECEIVE_EVENTS:
      return receiveEvents(state, action);
    default:
      return state;
  }
}

// TODO: Delete.
function appendEvents(state: EventsState, action: Object): EventsState {
  return {
    ...state,
    items: state.items.concat(action.events),
  };
}

function requestEvents(state: EventsState, action: Object): EventsState {
  return {...state, isFetching: true};
}

function receiveEvents(state: EventsState, action: Object): EventsState {
  const isUnique = newEvent =>
      !state.items.find(existingEvent => existingEvent.id === newEvent.id);
  const uniqueItems = action.items.filter(isUnique);
  const items = state.items.concat(uniqueItems);
  return {
    ...state,
    isFetching: false,
    items,
  };
}

/**
 * Play the video with given YouTube video id, and stop all others.
 */
function playVideoByYoutubeId(state: EventsState, action: Object): EventsState {
  const items = state.items.map(event => ({
      ...event,
      videoIsPlaying: event.videoId === action.youtubeId}));
  return {
    ...state,
    items,
  };
}

function playVideoOfNextEventIfPresent(state: EventsState, action: Object): EventsState {
  const currentlyPlayingVideo = state.items.find(event => event.videoIsPlaying);
  if (!currentlyPlayingVideo) {
    return state;
  }

  // TODO: Polyfill and use Array.prototype.indexOf
  const currentlyPlayingIndex = state.items.indexOf(currentlyPlayingVideo);
  const nextEventWithVideo = state.items.find(
      (event, index) => !!event.videoId && index > currentlyPlayingIndex);
  if (!nextEventWithVideo) {
    const items = state.items.map(event => ({...event, videoIsPlaying: false}));
    return {...state, items};
  }

  const indexToPlay = state.items.indexOf(nextEventWithVideo);
  const items = state.items.map((event, index) => ({
    ...event,
    videoIsPlaying: index === indexToPlay,
  }));

  return {...state, items};
}

function stopVideoPlayback(state: EventsState): EventsState {
  const items = state.items.map(event => ({...event, videoIsPlaying: false}));
  return {...state, items};
}