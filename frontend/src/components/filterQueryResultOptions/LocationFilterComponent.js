import React from "react";
import { Form } from "react-bootstrap";

const LocationFilterComponent = () => {
  return (
    <Form>
      <Form.Group controlId="filterLocation">
        <Form.Label>Filtrar por ubicación</Form.Label>
        <Form.Control
          type="text"
          name="location"
          placeholder="Ingresar ubicación"
        />
      </Form.Group>
    </Form>
  );
};

export default LocationFilterComponent;
