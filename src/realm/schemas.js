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
    title: 'string',
    date: 'int',
    distance: {type: 'int', default: 0},
    waypoints: 'Coordinates[]',
    notes: 'Note[]',
  },
};

export const UserSchema = {
  name: 'User',
  properties: {
    tracks: {type: 'Track[]', default: []},
    currentTrack: {type: 'Track', default: {}, optional: true},
  },
};

const schemas = [UserSchema, TrackSchema, CoordinatesSchema, NoteSchema];

export default schemas;
