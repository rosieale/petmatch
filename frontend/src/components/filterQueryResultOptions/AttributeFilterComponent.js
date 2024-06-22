import React from "react";
import { Form } from "react-bootstrap";

const AttributeFilterComponent = () => {
  return (
    <Form>
      <Form.Group controlId="filterAttribute">
        <Form.Label>Filtrar por atributo</Form.Label>
        <Form.Control
          type="text"
          name="attribute"
          placeholder="Ingresar atributo"
        />
      </Form.Group>
    </Form>
  );
};

export default AttributeFilterComponent;
