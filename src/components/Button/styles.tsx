import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 340px;
  margin-top: 20px;
  background-color: #ff9900;
  border: 0;
  border-radius: 10px;
  height: 56px;
  width: 100%;
  color: #312e38;
  font-weight: 500;
  padding: 0 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#ff9900')};
  }
`;
