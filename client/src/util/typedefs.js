// @flow

export type SongkickEvent = {
  videoIsPlaying: ?boolean,
  displayName: string,
  venue: Venue,
  uri: string,
  performance: Array<Performance>,
  date: string,
  /** YouTube video ID. */
  videoId: ?string,
  id: number,
};

export type Venue = {
  lng: number,
  lat: number,
  displayName: string,
  uri: string,
  metroArea: MetroArea,
  id: number,
};

export type Performance = {
  billingIndex: number,
  billing: string,
  artist: Artist,
  displayName: string,
  id: number,
};

export type MetroArea = {
  displayName: string,
  uri: string,
  id: number,
  state: State,
  country: Country,
};

export type State = {
  displayName: string,
};

export type Country = {
  displayName: string,
};

export type Artist = {
  identifier: Array<ArtistIdentifier>,
  displayName: string,
  uri: string,
  id: number,
};

export type ArtistIdentifier = {
  /** Some kind of GUID.  Don't know the context. */
  mbid: string,
  /**
   * URL to another Songkick API endpoint, like:
   * http://http://api.songkick.com/api/3.0/artists/mbid:<MBID>.json
   * where <MBID> is the "mbid" propert of ArtistIdentifier.
   */
  href: string,
};

export type EventsState = {
  items: Array<SongkickEvent>,
  isFetching: boolean,
};

export type ReduxState = {
  loadingMessage?: string,
  events?: EventsState,
  dislikedEventsById?: Array<number>,
  dislikedEventsById?: Array<number>,
  likedEventsById?: Array<number>,
  user?: ?FirebaseUser,
}

export type Location = {
  latitude: number,
  longitude: number,
};

export type FirebaseUser = {
  displayName: ?string,
  email: ?string,
  photoURL: ?string,
  uid: string,
}