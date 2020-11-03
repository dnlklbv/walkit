import React, {useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';

import ModalHeader from '@components/ModalHeader';
import {H1, Text} from '@components/Text';
import {LargeButton} from '@components/Button';
import {Wrapper, TextArea} from './styles';

const EditNoteModal = () => {
  const [noteText, setNoteText] = useState('');

  const handleTextChange = (text) => setNoteText(text);

  return (
    <>
      <ModalHeader />
      <Wrapper>
        <View>
          <H1>Новая заметка</H1>
          <TextArea
            multiline
            placeholder="Заметка..."
            autoFocus
            onChangeText={handleTextChange}
            value={noteText}
          />
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <LargeButton>
            <Text>Сохранить заметку</Text>
          </LargeButton>
        </KeyboardAvoidingView>
      </Wrapper>
    </>
  );
};

export default EditNoteModal;
