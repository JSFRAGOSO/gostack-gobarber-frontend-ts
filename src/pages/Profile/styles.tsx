import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 35px;
        height: 35px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  width: 700px;
  margin: -176px auto 0;
`;

export const AnimatedContainter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 20px;
      text-align: left;
      margin-bottom: 24px;
      margin-top: 32px;
      margin-right: auto;
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
`;

export const AvatarInput = styled.div`
  position: relative;
  > img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0px;
    right: 0px;
    background-color: #ff9900;
    border: none;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    transition: background-color 0.2s;
    cursor: pointer;
    > input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #333;
    }

    &:hover {
      background: ${shade(0.2, '#ff9900')};
    }
  }
`;
