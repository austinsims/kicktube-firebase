// @flow
import type {SongkickEvent, Location} from '../util/typedefs';
import {updateLoadingMessage} from './loadingMessage';

export const types = {
  APPEND_EVENTS: 'APPEND_EVENTS',
  REQUEST_EVENTS: 'REQUEST_EVENTS',
  RECEIVE_EVENTS: 'RECEIVE_EVENTS',
  PLAY_VIDEO_BY_YOUTUBE_ID: 'PLAY_VIDEO_BY_YOUTUBE_ID',
  PLAY_NEXT_VIDEO: 'PLAY_NEXT_VIDEO',
  STOP_VIDEO_PLAYBACK: 'STOP_VIDEO_PLAYBACK',
};

// TODO: Delete
export function appendEvents(events: Array<SongkickEvent>) {
  return {
    type: types.APPEND_EVENTS,
    events,
  }
}

export function requestEvents(pageNumber: number) {
  return {
    type: types.REQUEST_EVENTS,
    pageNumber,
  }
}

export function receiveEvents(items: Array<SongkickEvent>) {
  return {
    type: types.RECEIVE_EVENTS,
    items,
  }
}

export function fetchEvents(location: Location, pageNumber: number) {
  return function(dispatch: Function) {
    dispatch(requestEvents(pageNumber));
    const url = getUrlForLocationAndPage(location, pageNumber);
    return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(receiveEvents(json));
          dispatch(updateLoadingMessage(''));
        })
        .catch(reason => dispatch(updateLoadingMessage(''+reason)));
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

const HOST = 'https://us-central1-kicktube-87085.cloudfunctions.net';
function getUrlForLocationAndPage(location: Location, pageNumber: number) {
  const path = `/events?latitude=${location.latitude}&longitude=${location.longitude}&page=${pageNumber}`;
  return HOST + path;
}