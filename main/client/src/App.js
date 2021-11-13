import React, { useState } from "react";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);
  const registered = (e) => {
    e.preventDefault();
    if (name !== "") {
      setRegister(true);
    }
  };
  return (
    <div className="App">
      {!register && (
        <div className="inputName">
          <form onSubmit={registered}>
            <p>Type Nickname 😊</p>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button>OK</button>
          </form>
        </div>
      )}
      {register && <Chat name={name} />}
    </div>
  );
}

export default App;
