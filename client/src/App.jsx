import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import GameLobby from "./pages/GameLobby";
import io from "socket.io-client";
const socket = io('http://localhost:3000/');

function App() {
  const initialPlayer = {playerId: "1234", playerName: "Beben", insider: false, admin: false}

  const [gameId, setGameId] = useLocalStorage("gameId", "");
  const [gameSettings, setGameSettings] = useState({numPlayers: null, answerTime: 0, insiderTime: 0});


  // takes in game ID to join
  function handleJoinGame(gameId) {
    const id = gameId.toUpperCase();
    // setGameId(id);
    setGameSettings({roomId: id});

    // join an already created room
    joinRoom(id);

  }

  function handleCreateGame(newGameId, gameObject) {
    setGameId(newGameId);
    setGameSettings(gameObject);
    createRoom(newGameId);
  }

  function handleExitGame(currentGameId) {
    setGameId("");
    setGameSettings((prevGameSettings) => {
      return {
        ...prevGameSettings,
        roomId: "",
      }
    });

    leaveRoom(currentGameId)
    
  }

  
  // /** Socket IO Setup/ 
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
      // setLastPong(new Date().toISOString());
      console.log('test pong');
    });

    socket.on("room-created", (msg) => {
      console.log(msg.msg);
    })

    socket.on("room-joined", (msg) => {
      if(msg.exists) {setGameId(msg.gid)}
      console.log(msg.msg);
    })

    socket.on("room-left", (msg) => {
      console.log(msg.msg);
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("room-created");
      socket.off("room-joined");
      socket.off("room-left");
    };
  }, []);


// TODO: Delete these functions
  const sendPing = () => {
    socket.emit('ping');
  }

  const joinRoom = (roomId) => {
    socket.emit('join-room', roomId)
  }

  const createRoom = (roomId) => {
    socket.emit('create-room', roomId)
  }

  const leaveRoom = (roomId) => {
    socket.emit('leave room', roomId)
  }

  // const sendMsg = (msg) => {
  //   socket.emit('new msg', msg);
  // }

  // const checkRooms = () => {
  //   socket.emit('check rooms')
  //   console.log("check server console");
  // }
  //*/

  return (
    gameId ? 
      <GameLobby 
        gameSettings={gameSettings}
        handleExitGame={handleExitGame}
      /> :  
      <Login 
        handleJoinGame={handleJoinGame} 
        handleCreateGame={handleCreateGame}
        setGameSettings={setGameSettings}
      />
  );
}



export default App;
