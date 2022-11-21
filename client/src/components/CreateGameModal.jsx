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
  setGameSettings,
  handleCreateGame,
}) {

  const answerTimeInput = useRef();
  const insiderTimeInput = useRef();
  const adminNameInput = useRef();

  function handleClick() {
    if (!adminNameInput.current.value) return;
    const adminName = adminNameInput.current.value;
    const newGameId = createSecret(4);
    handleClose();

    const newGameObject = {
      roomId: newGameId,
      adminId: 12345,
      answerTime: answerTimeInput.current.value || 5,
      insiderTime: insiderTimeInput.current.value || 3,
    }

    handleCreateGame(newGameId, newGameObject);
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
          <Form.Group className="mb-3">
            <Form.Label>Your name</Form.Label>
            <Form.Control ref={adminNameInput} type="text" autoFocus required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of players</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time to find answer</Form.Label>
            <Form.Control ref={answerTimeInput} type="number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time to find insider</Form.Label>
            <Form.Control ref={insiderTimeInput} type="number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Go to Lobby
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
