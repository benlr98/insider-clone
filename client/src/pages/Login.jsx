import React, { useState, useRef } from "react";
import { Container, Form, Button, Stack, Modal } from "react-bootstrap";
import CreateGameModal from "../components/CreateGameModal";

// import io from "socket.io-client";
// const socket = io("http://localhost:3000/");



export default function Login({ 
  setGameId, 
  setPlayerId, 
  setAnswerTime, 
  setInsiderTime 
}) {

  const idRef = useRef();

  // Modal Controls
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // joins an already created game
  function handleSubmit(e) {
    e.preventDefault();
    const gameId = idRef.current.value.toUpperCase();
    setGameId(gameId);
  }

  

  return (
    <Container className="vh-100 d-flex">
      <Stack
        className="align-self-center mx-auto"
        style={{ maxWidth: "300px" }}
        gap={3}
      >
        <h1 className="text-center">Insider Clone</h1>
        <Button className="mb-4" onClick={handleShow} variant="secondary">
          Create New Game
        </Button>
        {/* <hr className="bg-dark border-3 border-top border-dark" /> */}
        <Form onSubmit={handleSubmit} className="">
          <Button className="mb-3 w-100" variant="primary" type="submit">
            Join Game
          </Button>
          <Form.Group className="mb-3">
            <Form.Control type="text" ref={idRef} placeholder="room id" />
          </Form.Group>
        </Form>
      </Stack>

      <CreateGameModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        setGameId={setGameId}
        setAnswerTime={setAnswerTime}
        setInsiderTime={setInsiderTime}
      />
    </Container>
  );
}
