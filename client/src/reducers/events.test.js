import events from './events';
import {
  types,
  appendEvents,
  playVideoByYoutubeId,
  playVideoOfNextEventIfPresent,
  stopVideoPlayback,
} from '../actions/events';

describe("events reducer", () => {

  describe(`handles ${types.APPEND_EVENTS} actions`, () => {
    test("appends events", () => {
      const initialState = [{displayName: 'Regina Spektor'}];
      const action = appendEvents([{displayName: 'Radiohead'}]);
      const expectedState = [
        {displayName: 'Regina Spektor'},
        {displayName: 'Radiohead'}];
      expect(events(initialState, action)).toEqual(expectedState);
    });
  });

  describe(`handles ${types.PLAY_VIDEO_BY_YOUTUBE_ID} actions`, () => {

    test("plays the video with the given id", () => {
      const initialState = [notPlayingEvent];
      const action = playVideoByYoutubeId('not-playing');
      const expectedState = [{...notPlayingEvent, videoIsPlaying: true}];
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("stops other videos", () => {
      const initialState = [playingEvent, notPlayingEvent];
      const action = playVideoByYoutubeId('not-playing');
      const expectedState = [
        {...playingEvent, videoIsPlaying: false},
        {...notPlayingEvent, videoIsPlaying: true},
      ];
      expect(events(initialState, action)).toEqual(expectedState);
    });

  });

  describe(`handles ${types.PLAY_NEXT_VIDEO} actions`, () => {
    test("plays the next video, if there is one", () => {
      const initialState = [playingEvent, notPlayingEvent];
      const action = playVideoOfNextEventIfPresent();
      const expectedState = [
        {...playingEvent, videoIsPlaying: false},
        {...notPlayingEvent, videoIsPlaying: true},
      ];
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("does nothing when playing next video, if none playing", () => {
      const initialState = [notPlayingEvent, anotherNotPlayingEvent];
      const action = playVideoOfNextEventIfPresent();
      const expectedState = initialState;
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("skips over an event without a video when playing next video", () => {
      const initialState = [playingEvent, eventWithNoVideo, notPlayingEvent];
      const action = playVideoOfNextEventIfPresent();
      const expectedState = [
        {...playingEvent, videoIsPlaying: false},
        eventWithNoVideo,
        {...notPlayingEvent, videoIsPlaying: true},
      ];
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("stops playback when trying to play next after last video", () => {
      const initialState = [notPlayingEvent, playingEvent];
      const action = playVideoOfNextEventIfPresent();
      const expectedState = [
        notPlayingEvent,
        {...playingEvent, videoIsPlaying: false},
      ];
      expect(events(initialState, action)).toEqual(expectedState);
    });

  });

  describe(`handles ${types.STOP_VIDEO_PLAYBACK} actions`, () => {

    test("stops playback", () => {
      const initialState = [playingEvent];
      const action = stopVideoPlayback();
      const expectedState = [{...playingEvent, videoIsPlaying: false}];
      expect(events(initialState, action)).toEqual(expectedState);
    });

  });
});

const playingEvent = Object.freeze({
  displayName: 'Fun Concert',
  videoIsPlaying: true,
  videoId: 'playing',
});

const notPlayingEvent = Object.freeze({
  displayName: 'Even More Fun',
  videoIsPlaying: false,
  videoId: 'not-playing',
});

const anotherNotPlayingEvent = Object.freeze({
  displayName: 'Still So Fun',
  videoIsPlaying: false,
  videoId: 'another-not-playing',
});

const eventWithNoVideo = Object.freeze({
  displayName: 'No Video Found',
  videoIsPlaying: false,
});