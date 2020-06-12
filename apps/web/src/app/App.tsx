import React, { useEffect } from 'react';
import { Session } from './Session';
import styled from 'styled-components';
// import p5 from 'p5';
import SessionControl from './components/SessionControl';
// let sketch = function (p) {
//   let x = 100;
//   let y = 100;

//   p.setup = function () {
//     p.createCanvas(700, 410);
//   };

//   p.draw = function () {
//     p.background(0);
//     p.fill(255);
//     p.rect(x, y, 50, 50);
//   };
// };
const Container = styled.div``;
function App() {
  useEffect(() => {
    // let myp5 = new p5(sketch, document.getElementById('app'));
  }, []);
  return (
    <Container className="App" id="app">
      <SessionControl onStart={Session.start} onStop={Session.stop} />
    </Container>
  );
}

export default App;
