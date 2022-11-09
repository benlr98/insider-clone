import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Dashboard({ id }) {

  

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100">
        <Form.Group className="mb-3">
          <Form.Label>Game id: <span className="fw-bold">{id}</span></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of players</Form.Label>
          <Form.Control type="number" placeholder="" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time to find the answer</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time to find the insider</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Button className="me-3" variant="primary" type="submit">
          Create Room
        </Button>
      </Form>
    </Container>
  );
}
