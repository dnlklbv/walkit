export const CoordinatesSchema = {
  name: 'Coordinates',
  properties: {
    latitude: 'double',
    longitude: 'double',
    heading: 'double',
    speed: 'double',
  },
};

export const NoteSchema = {
  name: 'Note',
  properties: {
    coordinates: 'Coordinates',
    text: 'string',
  },
};

export const TrackSchema = {
  name: 'Track',
  properties: {
    waypoints: 'Coordinates[]',
    notes: 'Note[]',
  },
};

export const UserSchema = {
  name: 'User',
  properties: {
    tracks: {type: 'Track[]', default: []},
    currentTrack: {type: 'Track?', default: []},
  },
};

const schemas = [UserSchema, TrackSchema, CoordinatesSchema, NoteSchema];

export default schemas;
