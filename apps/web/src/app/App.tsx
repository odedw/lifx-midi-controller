import React, { useEffect } from 'react';
import { Session } from './Session';
import styled from 'styled-components';
import SessionControl from './components/SessionControl';
// import Sketch from './components/Sketch';

const Container = styled.div`
  height: 100%;
`;
const SessionControlContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Sketch = styled.div`
  height: 100%;
`;

function App() {
  return (
    <Container className="App" id="app">
      <SessionControlContainer>
        <SessionControl onStart={Session.start} onStop={Session.stop} />
      </SessionControlContainer>
      <Sketch id="sketch-container" />
    </Container>
  );
}

export default App;
