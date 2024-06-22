import React from "react";
import { Form } from "react-bootstrap";

const SortOptionsComponent = () => {
  return (
    <Form>
      <Form.Group controlId="sortOrder">
        <Form.Label>Ordenar por</Form.Label>
        <Form.Control as="select" name="sortOrder">
          <option value="name">Nombre</option>
          <option value="rating">Rating</option>
          <option value="location">Ubicación</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default SortOptionsComponent;
