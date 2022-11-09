import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import io from "socket.io-client";

const socket = io('http://localhost:3000/');

const LETTERS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

export default function Login({ onIdSubmit, sendMsg }) {
    const idRef= useRef();

    // joins an already created game
    function handleSubmit(e) {
        e.preventDefault();
        const gameId = idRef.current.value.toUpperCase()
        onIdSubmit(gameId)
        sendMsg(gameId)
    }

    /**
     * Creates a new game Id and sets it within App
     */
    function createNewGameId() {
        const keyLength = 4;
        let gameId = '';
        for (let i = 0; i < keyLength; i++) {
            gameId = gameId + LETTERS[Math.floor(Math.random() * 26)]
        }
        gameId.toUpperCase();
    }



  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
        <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-3">
                <Form.Label>Game Id</Form.Label>
                <Form.Control type="text" ref={idRef} placeholder="" />
            </Form.Group>
            <Button className="me-3" variant="primary" type="submit">Join Game</Button>
            <Button onClick={createNewGameId} variant="secondary">Create New Game</Button>
            
        </Form>
    </Container>
  )
}
