import React from "react";
import Canvas from "./components/Canvas";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <p
          style={{
            fontWeight: 400,
            fontFamily: "Open Sans, sans-serif",
            fontSize: 32,
            lineHeight: "20px",
          }}
        >
          Fabric.js <b>· Kitchensink</b>
        </p>
        <Canvas />
      </div>
    </div>
  );
}

export default App;
