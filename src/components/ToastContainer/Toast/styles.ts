import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'error' | 'sucess' | 'info';
  hasDescription: boolean;
}

const toastTypes = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  sucess: css`
    background: #e6ff99;
    color: #656565;
  `,
  error: css`
    background: #e9a1a1;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;

  background: #ebf8ff;
  color: #3172b7;

  && + div {
    margin-top: 7px;
  }

  ${props => toastTypes[props.type || 'info']}

  > svg {
    margin-bottom: 22px;
    margin-right: 16px;
  }

  div {
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
      font-weight: bold;
    }
  }
  button {
    position: absolute;
    right: 15px;
    top: 20%;
    border: 0;
    background: transparent;
    margin-bottom: 16px;
    color: inherit;
  }
  ${props =>
    !props.hasDescription &&
    css`
      > svg {
        margin-bottom: 0px;
      }
      button {
        top: 30%;
      }
    `}
`;
