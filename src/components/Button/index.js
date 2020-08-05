import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  background: #faefd4;
  justify-content: center;
  align-items: center;
`;

export const LargeButton = styled(Button)`
  width: 100%;
  background: #faefd4;
  border-radius: 10px;
  min-height: 66px;
`;
