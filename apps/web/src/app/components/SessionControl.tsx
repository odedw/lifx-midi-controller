import React, { useState } from 'react';
import styled from 'styled-components';
import Play from '../../assets/icons/play.png';
import Stop from '../../assets/icons/stop.png';

const Container = styled.div``;
const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  &:active {
  }
`;
export interface Props {
  onStart: () => void;
  onStop: () => void;
}
const SessionControl: React.FC<Props> = ({ onStart, onStop }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Container>
      <Button
        onClick={() => {
          isPlaying ? onStop() : onStart();
          setIsPlaying(!isPlaying);
        }}
      >
        <img src={isPlaying ? Stop : Play} />
      </Button>
    </Container>
  );
};

export default SessionControl;
