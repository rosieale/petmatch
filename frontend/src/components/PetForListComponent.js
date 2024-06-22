import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PetForListComponent = ({ pet }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex">
          <div className="me-3">
            {pet.imageUrl ? (
              <img
                src={pet.imageUrl}
                alt={pet.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
            )}
          </div>
          <div>
            <Card.Title>{pet.name}</Card.Title>
            <Card.Text>Ubicación: {pet.location}</Card.Text>
            <Card.Text>Tipo: {pet.type}</Card.Text>
            <LinkContainer to={`/pets/details/${pet._id}`}>
              <Button variant="primary">Ver Mascota</Button>
            </LinkContainer>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PetForListComponent;
