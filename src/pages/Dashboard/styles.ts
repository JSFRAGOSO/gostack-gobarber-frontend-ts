import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background-color: #28262e;
`;
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  img {
    height: 80px;
  }

  > button {
    margin-left: auto;
    background-color: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 90px;
  a {
    text-decoration: none;
    color: #ff9000;
  }
  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  > div {
    display: flex;
    flex-direction: column;
    line-height: 24px;
    margin-left: 20px;
    > span {
      color: #f4ede8;
    }
    > strong {
      color: #ff9000;
    }
  }
`;
export const Content = styled.main`
  max-width: 1120px;
  margin: 65px auto;
  display: flex;
`;
export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;
  h1 {
    font-size: 36px;
    font-family: Roboto Slab;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  li {
    float: left;
    color: #ff9000;
    font-weight: 500;
  }
  li + li {
    margin-left: 5px;
  }
`;
export const NextAppointment = styled.div`
  margin-top: 64px;
  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    display: flex;
    align-items: center;
    background-color: #3e3b47;
    border-radius: 10px;
    margin-top: 10px;
    padding: 16px 24px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 40px;
    }

    strong {
      margin-left: 24px;
      font-size: 20px;
      font-weight: normal;
    }

    span {
      color: #999591;
      display: flex;
      align-items: center;
      margin-left: auto;
      svg {
        margin-right: 8px;
        color: #ff9000;
      }
    }
  }
`;
export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: normal;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    width: 70px;
    svg {
      color: #ff9000;
      margin-right: 10px;
    }
  }

  div {
    display: flex;
    flex: 1;
    align-items: center;
    margin-left: 26px;
    background-color: #3e3b47;
    border-radius: 10px;
    padding: 16px 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 28px;
    }

    strong {
      margin-left: 24px;
      font-size: 16px;
      font-weight: normal;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
