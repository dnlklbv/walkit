import React from 'react';
import {Marker} from 'react-native-maps';

import {showNoteModal} from '@utils/navigation';

const NoteMarker = ({note}) => {
  const showNote = () => showNoteModal(note);
  return <Marker coordinate={note.coordinates} onPress={showNote} />;
};

export default NoteMarker;
