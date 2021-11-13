import React, { useState, useEffect, useRef } from "react";
import Socket from "./Socket";
import "../App.css";
import "../animate.css";

const Chat = ({ name }) => {
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (msg) {
        Socket.emit("message", name, msg);
        setMsg("");
        inputElement.current.focus();
      }
    }
  }

  const [msg, setMsg] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [refName, setRefName] = useState([]);

  useEffect(() => {
    Socket.emit("connected", name);
    setRefName(name);
  }, [name]);

  useEffect(() => {
    Socket.on("messages", (newMsgs) => {
      setMsgs([...msgs, newMsgs]);
    });
    return () => {
      Socket.off();
    };
  }, [msgs]);

  const inputElement = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    if (msg) {
      var time = "time";
      Socket.emit("message", name, msg, time);
      setMsg("");
      inputElement.current.focus();
    }
  };

  return (
    <div className="containerChat">
      <div className="chat">
        {msgs.map((e, i) => (
          <div key={i} className="userMsgWrapChat">
            <div className="nameAndDateChat animate__animated animate__fadeIn animate__fast">
              <p
                className={
                  e.name === refName
                    ? "userNameChat"
                    : "userNameChat chatReceived"
                }
              >
                {e.name}
              </p>
              <p className="userTimeChat">{e.time}</p>
            </div>
            <p
              className={
                e.name === refName
                  ? "userMsgChat animate__animated animate__fadeInLeft animate__faster"
                  : "userMsgChat animate__animated animate__fadeInRight animate__faster chatReceived"
              }
            >
              {e.msg}
            </p>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>

      <form onSubmit={submit} className="chatForm">
        <textarea
          placeholder="Type message..."
          className="textareaChat"
          autoFocus
          ref={inputElement}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        ></textarea>
        <button className="sendButtonChat">▶</button>
      </form>
    </div>
  );
};
export default Chat;
