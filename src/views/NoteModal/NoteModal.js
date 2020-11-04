import React, {useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {connect} from 'react-redux';

import ModalHeader from '@components/ModalHeader';
import {H1, Text} from '@components/Text';
import {LargeButton} from '@components/Button';
import {Wrapper, TextArea} from './styles';
import {dismissAllModals} from '@utils/navigation';
import * as tracksActions from '@store/actions/tracksActions';

const NoteModal = ({coordinates, text = '', addNote, isNew = false}) => {
  const [noteText, setNoteText] = useState(text);
  const title = isNew ? 'Новая заметка' : 'Заметка';

  const handleTextChange = (t) => setNoteText(t);
  const saveNote = () => {
    addNote({coordinates, text: noteText});
    dismissAllModals();
  };

  return (
    <>
      <ModalHeader />
      <Wrapper>
        <View>
          <H1>{title}</H1>
          <TextArea
            editable={isNew}
            multiline
            placeholder="Заметка..."
            autoFocus
            onChangeText={handleTextChange}
            value={noteText}
          />
        </View>
        {isNew && (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <LargeButton onPress={saveNote}>
              <Text>Сохранить заметку</Text>
            </LargeButton>
          </KeyboardAvoidingView>
        )}
      </Wrapper>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(tracksActions.addNote(note)),
});

export default connect(null, mapDispatchToProps)(NoteModal);
