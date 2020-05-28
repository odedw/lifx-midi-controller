import React from "react";
import { Session } from "./Session";

function App() {
  return (
    <div className="App">
      <button onClick={() => Session.start()}>Start</button>
      <button onClick={() => Session.stop()}>Stop</button>
    </div>
  );
}

export default App;
