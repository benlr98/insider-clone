import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/CreateGame";
import Login from "./pages/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import io from "socket.io-client";

const socket = io('http://localhost:3000/');

function App() {
  const [id, setId] = useLocalStorage("id", "");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  const sendMsg = (msg) => {
    console.log(msg)
    socket.emit('new msg', msg);
  }

  return (
    <div>
      {/* {id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />} */}
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>

      <Routes>
        <Route path="/" element={<Login sendMsg={sendMsg} onIdSubmit={setId} />} />
      </Routes>
    </div>
  );
}

export default App;
