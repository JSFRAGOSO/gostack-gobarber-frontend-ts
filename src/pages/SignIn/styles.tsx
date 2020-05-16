import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import background from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity:0;
    transform:translateX(-300px);
  }

  to {
    opacity:1;
    transform:translateX(0);
  }
`;

export const AnimatedContainter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      margin-bottom: 24px;
    }

    a {
      text-decoration: none;
      color: #fff;
      margin-top: 20px;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }
  }
  a {
    text-decoration: none;
    color: #ff9900;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    &:hover {
      color: ${shade(0.2, '#ff9900')};
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
`;
