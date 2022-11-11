import React from 'react'
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';

export default function GameLobby({ 
    gameId,
    setGameId,
    answerTime,
    insiderTime,

}) {



  return (
    <>
        <Navigation setGameId={setGameId} />
        <Container>
            <h1 className="text-center mt-3">Game Lobby</h1>
            <div className="border border-5 rounded-4 p-3">
                <h2 className="fs-5">Settings</h2>
                <ul>
                    <li>Room Id: <span className="fw-bold">{gameId}</span></li>
                    <li>Find Answer: {answerTime} min</li>
                    <li>Find Insider: {insiderTime} min</li>
                </ul>
            </div>
            
        </Container>
    </>
    
  )
}
