import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

export default function Navigation({ setGameId }) {
  return (
    <Navbar bg="light">
        <Container>
            <Navbar.Brand>Insider</Navbar.Brand>
            <Button onClick={() => setGameId("")} size="sm" variant="outline-danger">Exit Game</Button>
        </Container>
    </Navbar>
  )
}
