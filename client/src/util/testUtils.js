const defaultMetroArea = {
  displayName: 'Footown',
  uri: 'https://songkick.com/foo-town',
  id: 54321,
  state: {displayName: 'FO'},
  country: {displayName: 'United States of Foo'},
};

const defaultVenue = {
  lng: 42.2,
  lat: 24.4,
  displayName: 'Castle of Foo',
  uri: 'https://songkick.com/castle-of-foo',
  metroArea: defaultMetroArea,
  id: 12345,
};

const defaultArtist = {
  identifier: [{mbid: '0000-1111', href: 'https://songkickk.com/0000-1111'}],
  displayName: 'Celine FooDon',
  uri: 'https://songkick.com/celine-foodon',
  id: 43234,
}

// TODO
const defaultPerformance = [{
  billingIndex: 1,
  billing: 'Headline',
  artist: defaultArtist,
  displayName: 'Performance',
  id: 11111111,
}];

export function makeEvent(opts = {}) {
  return {
    videoIsPlaying: typeof opts.videoIsPlaying === 'boolean' ?
        opts.videoIsPlaying :
        false,
    displayName: opts.displayName || 'Foo Bazzle',
    venue: opts.venue || defaultVenue,
    uri: opts.uri || 'https://songkick.com/foo-bazzle',
    performance: opts.performance || defaultPerformance,
    date: opts.date || 'Sunday, March 5 2049',
    videoId: opts.videoId || '0xDEADBEEF',
    id: typeof opts.id === 'number' ? opts.id : 0,
  };
}

export function makeEventsState(opts = {}) {
  return {
    items: opts.items || [makeEvent()],
    isFetching: typeof opts.isFetching === 'boolean' ? opts.isFetching : false,
  };
}

export function failTestOnPropTypeFailure() {
  console.error = function(message) {
    if (message.indexOf('Failed prop type') >= 0) {
      throw new Error(message);
    }
  };
}