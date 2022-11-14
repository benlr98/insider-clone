import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import GameLobby from "./pages/GameLobby";
// import io from "socket.io-client";
// const socket = io('http://localhost:3000/');

function App() {
  const initialPlayer = {playerId: "1234", playerName: "Beben", insider: false, admin: false}
  const [gameId, setGameId] = useLocalStorage("gameId", "");
  const [numPlayers, setNumPlayers] = useState()
  const [answerTime, setAnswerTime] = useState();
  const [insiderTime, setInsiderTime] = useState();
  
  const [playerId, setPlayerId] = useLocalStorage("playerId", "");
  const [playerName, setPlayerName] = useState("");
  const [admin, setAdmin] = useState(false)
  const [player, setPlayer] = useState(initialPlayer);

  
  /** Socket IO Setup 
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
    socket.emit('new msg', msg);
  }

  const checkRooms = () => {
    socket.emit('check rooms')
    console.log("check server console");
  }
  */

  return (
    gameId ? 
      <GameLobby 
        gameId={gameId} 
        setGameId={setGameId}
        answerTime={answerTime}
        insiderTime={insiderTime}
        playerName={playerName}
        admin={admin}
      /> :  
      <Login 
        setGameId={setGameId} 
        setPlayerId={setPlayerId} 
        setAdmin={setAdmin}
        setAnswerTime={setAnswerTime}
        setInsiderTime={setInsiderTime}
        setPlayerName={setPlayerName}
        setPlayerList={setPlayer}
      />
  );
}



export default App;
