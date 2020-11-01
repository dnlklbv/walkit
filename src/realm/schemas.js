export const CoordinatesSchema = {
  name: 'Coordinates',
  properties: {
    latitude: 'double',
    longitude: 'double',
    heading: 'double',
    speed: 'double',
  },
};

export const TrackSchema = {
  name: 'Track',
  properties: {
    waypoints: 'Coordinates[]',
  },
};

export const UserSchema = {
  name: 'User',
  properties: {
    tracks: {type: 'Track[]', default: []},
    currentTrack: {type: 'Track?', default: []},
  },
};
