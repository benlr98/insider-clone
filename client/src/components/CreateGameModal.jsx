import React, { useState, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";

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
];

export default function CreateGameModal({
  show,
  handleClose,
  handleShow,
  setGameId,
  setPlayerId,
  setAnswerTime,
  setInsiderTime
}) {

  const answerTimeInput = useRef();
  const insiderTimeInput = useRef();

  function handleCreateGame() {
    const answerTime = answerTimeInput.current.value || 5;
    const insiderTime = insiderTimeInput.current.value || 3;
    const newGameId = createSecret(4);
    handleClose();
    setGameId(newGameId);
    setAnswerTime(answerTime);
    setInsiderTime(insiderTime);
  }

  /**
   * Returns a secret of uppercase letters
   * @param secretLength:string - length of desired key
   * @return secret:string - uppercased secret string
   */
  function createSecret(secretLength) {
    let secret = "";
    for (let i = 0; i < secretLength; i++) {
      secret = secret + LETTERS[Math.floor(Math.random() * 26)];
    }
    return secret.toUpperCase();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Number of players</Form.Label>
            <Form.Control type="number" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Time to find answer</Form.Label>
            <Form.Control ref={answerTimeInput} type="number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Time to find insider</Form.Label>
            <Form.Control ref={insiderTimeInput} type="number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateGame}>
          Go to Lobby
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
