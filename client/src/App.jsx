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
  function handleJoinGame(newGameId) {
    console.log(newGameId);
    // TODO: check to see if game exists
    setGameId(newGameId.toUpperCase());
    setGameSettings((prevGameSettings) => {
      return {
        roomId: newGameId.toUpperCase(),
        ...prevGameSettings,
      }
    });
  }

  function handleCreateGame(newGameId, gameObject) {
    setGameId(newGameId);
    setGameSettings(gameObject);
    createRoom(newGameId);
    // console.log(newGameId, gameObject)
  }

  function handleExitGame() {
    setGameId("");
    setGameSettings((prevGameSettings) => {
      return {
        roomId: "",
        ...prevGameSettings,
      }
    })
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

    // socket.on("room joined", (msg) => {
    //   console.log(msg);
    // })

    socket.on("room-created", (msg) => {
      console.log(msg.msg);
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("room joined");
      socket.off("room created");
    };
  }, []);


// TODO: Delete these functions
  const sendPing = () => {
    socket.emit('ping');
  }

  const createRoom = (roomId) => {
    socket.emit('create room', roomId)
  }

  const joinRoom = (roomId) => {
    socket.emit('join room', roomId)
  }

  const sendMsg = (msg) => {
    socket.emit('new msg', msg);
  }

  const checkRooms = () => {
    socket.emit('check rooms')
    console.log("check server console");
  }
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
