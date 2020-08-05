import styled from 'styled-components/native';

export const Text = styled.Text`
  font-family: System;
  font-size: 15px;
  line-height: 18px;
  color: #000;
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
`;

export const H1 = styled(Text)`
  font-weight: ${({fontWeight}) => fontWeight || 'bold'};
  font-size: 30px;
  line-height: 36px;
`;
