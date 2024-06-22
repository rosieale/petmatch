import React from "react";
import { Form } from "react-bootstrap";

const CategoryFilterComponent = () => {
  return (
    <Form>
      <Form.Group controlId="filterCategory">
        <Form.Label>Filtrar por categoría</Form.Label>
        <Form.Control as="select" name="category">
          <option value="dogs">Perros</option>
          <option value="cats">Gatos</option>
          <option value="others">Otros</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default CategoryFilterComponent;
