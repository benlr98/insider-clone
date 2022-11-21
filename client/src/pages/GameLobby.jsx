import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import '../App.css';

export default function GameLobby({ 
    gameSettings,
    handleExitGame,
}) {



  return (
    <>
        <Navigation handleExitGame={() => handleExitGame(gameSettings.roomId)} />
        <Container className="">
            <h1 className="text-center mt-3">Game Lobby</h1>
            <div className="border border-5 rounded-4 p-3">
                <h2 className="fs-5">Settings</h2>
                <ul>
                    <li>Room Id: <span className="fw-bold">{gameSettings.roomId}</span></li>
                    <li>Find Answer: {gameSettings.answerTime} min</li>
                    <li>Find Insider: {gameSettings.insiderTime} min</li>
                </ul>
                <h2 className="fs-5">Players</h2>
                <div className="player-group d-flex flex-wrap">
                    <Button>Player 1 (admin)</Button>
                    <Button>Player 2</Button>
                    <Button>Player 3</Button>
                </div>
            </div>
            <div className="text-center">
                <Button className="mt-3">Start Game</Button>
            </div>
            
        </Container>
    </>
    
  )
}
