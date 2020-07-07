import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 400px;
  background: ${(props) => props.theme.notifications.background};
  color: ${(props) => props.theme.notifications.color};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 100%;
  margin: auto;
  transform: translateX(-90%);
`;

export const Header = styled.div`
  padding: 1rem;
  font-weight: bold;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: center;

  & p {
    margin: auto;
  }
`;

export const Actions = styled.div`
  position: absolute;
  right: 1rem;

  & > *:hover {
    cursor: pointer;
  }
`;

export const NotificationsContainer = styled.div`
  height: 400px;
  overflow: auto;
  display: flex;
  overscroll-behavior: contain;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(190, 190, 190, 0.3);
    box-shadow: inset 0 0 6px rgba(190, 190, 190, 0.3);
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: rgba(190, 190, 190, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(190, 190, 190, 0.3);
    box-shadow: inset 0 0 6px rgba(190, 190, 190, 0.3);
  }
  &::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(190, 190, 190, 0.3);
  }
`;
