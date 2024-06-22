import React from "react";
import { Form } from "react-bootstrap";

const RatingFilterComponent = () => {
  return (
    <Form>
      <Form.Group controlId="filterRating">
        <Form.Label>Filtrar por rating</Form.Label>
        <Form.Control as="select" name="rating">
          <option value="5">5 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="2">2 estrellas</option>
          <option value="1">1 estrella</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default RatingFilterComponent;
