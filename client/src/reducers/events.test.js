import events from './events';
import {makeEventsState} from '../util/testUtils';
import {
  types,
  appendEvents,
  playVideoByYoutubeId,
  playVideoOfNextEventIfPresent,
  stopVideoPlayback,
  requestEvents,
  receiveEvents,
} from '../actions/events';

describe("events reducer", () => {

  describe(`handles ${types.APPEND_EVENTS} actions`, () => {
    test("appends events", () => {
      const initialItems = [{displayName: 'Regina Spektor'}];
      const initialState = makeEventsState({items: initialItems});
      const action = appendEvents([{displayName: 'Radiohead'}]);
      const expectedItems =
          [{displayName: 'Regina Spektor'}, {displayName: 'Radiohead'}]
      const expectedState = makeEventsState({items: expectedItems});
      expect(events(initialState, action)).toEqual(expectedState);
    });
  });

  describe(`handles ${types.PLAY_VIDEO_BY_YOUTUBE_ID} actions`, () => {

    test("plays the video with the given id", () => {
      const initialItems = [notPlayingEvent];
      const initialState = makeEventsState({items: initialItems});
      const action = playVideoByYoutubeId('not-playing');
      const expectedItems = [{...notPlayingEvent, videoIsPlaying: true}];
      const expectedState = makeEventsState({items: expectedItems});
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("stops other videos", () => {
      const initialItems = [playingEvent, notPlayingEvent];
      const initialState = makeEventsState({items: initialItems});
      const action = playVideoByYoutubeId('not-playing');
      const expectedItems = [
        {...playingEvent, videoIsPlaying: false},
        {...notPlayingEvent, videoIsPlaying: true}];
      const expectedState = makeEventsState({items: expectedItems});
      expect(events(initialState, action)).toEqual(expectedState);
    });

  });

  describe(`handles ${types.PLAY_NEXT_VIDEO} actions`, () => {
    test("plays the next video, if there is one", () => {
      const initialItems = [playingEvent, notPlayingEvent];
      const initialState = makeEventsState({items: initialItems});
      const action = playVideoOfNextEventIfPresent();
      const expectedItems = [
        {...playingEvent, videoIsPlaying: false},
        {...notPlayingEvent, videoIsPlaying: true},
      ];
      const expectedState = makeEventsState({items: expectedItems});
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("does nothing when playing next video, if none playing", () => {
      const initialItems = [notPlayingEvent, anotherNotPlayingEvent];
      const initialState = makeEventsState({items: initialItems});
      const action = playVideoOfNextEventIfPresent();
      const expectedState = initialState;
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("skips over an event without a video when playing next video", () => {
      const initialItems = [playingEvent, eventWithNoVideo, notPlayingEvent];
      const initialState = makeEventsState({items: initialItems});
      const action = playVideoOfNextEventIfPresent();
      const expectedItems = [
        {...playingEvent, videoIsPlaying: false},
        eventWithNoVideo,
        {...notPlayingEvent, videoIsPlaying: true},
      ];
      const expectedState = makeEventsState({items: expectedItems});
      expect(events(initialState, action)).toEqual(expectedState);
    });

    test("stops playback when trying to play next after last video", () => {
      const initialItems = [notPlayingEvent, playingEvent];
      const initialState = makeEventsState({items: initialItems});
      const action = playVideoOfNextEventIfPresent();
      const expectedItems = [
        notPlayingEvent,
        {...playingEvent, videoIsPlaying: false},
      ];
      const expectedState = makeEventsState({items: expectedItems});
      // if (typeof events(initialState, action).isFetching !== 'boolean') throw new Error(Object.keys(events(initialState, action))); // DO NOT SUBMIT
      expect(events(initialState, action)).toEqual(expectedState);
    });

  });

  describe(`handles ${types.STOP_VIDEO_PLAYBACK} actions`, () => {

    test("stops playback", () => {
      const initialItems = [playingEvent];
      const initialState = makeEventsState({items: initialItems});
      const action = stopVideoPlayback();
      const expectedItems = [{...playingEvent, videoIsPlaying: false}];
      const expectedState = makeEventsState({items: expectedItems});
      expect(events(initialState, action)).toEqual(expectedState);
    });

  });

  describe(`handles ${types.REQUEST_EVENTS} actions`, () => {
    test("sets isFetching to true", () => {
      const initialState = makeEventsState({isFetching: false});
      const action = requestEvents(0);
      const expectedState = makeEventsState({isFetching: true});
      expect(events(initialState, action)).toEqual(expectedState);
    });
  });

  describe(`handles ${types.RECEIVE_EVENTS} actions`, () => {
    test("sets isFetching to false and merges in new events", () => {
      const one = {displayName: 'One'};
      const two = {displayName: 'Two'};
      const three = {displayName: 'Three'};
      const four = {displayName: 'Four'};

      const initialItems = [one, two];
      const initialState =
          makeEventsState({isFetching: true, items: initialItems});

      const action = receiveEvents([three, four]);
      const expectedItems = [one, two, three, four];
      const expectedState =
          makeEventsState({isFetching: false, items: expectedItems});

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