// src/components/PodItemComponent.js
import React from "react";
import { ListGroup, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Swal from "sweetalert2";

const PodItemComponent = ({ id, name, breed, location, image, onRemove }) => {
  const handleRemove = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarla",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onRemove(id);
        Swal.fire(
          "Eliminada!",
          "La mascota ha sido eliminada del pod.",
          "success"
        );
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Image
          src={image}
          rounded
          style={{
            width: "100px",
            height: "100px",
            marginRight: "10px",
            objectFit: "cover",
          }}
        />
        <div>
          <h5 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{name}</h5>
          <p style={{ fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            {breed}
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            {location}
          </p>
        </div>
      </div>
      <div>
        <LinkContainer to={`/user/userAdoptionDetailsPage/${id}`}>
          <Button variant="primary" style={{ fontSize: "0.875rem" }}>
            Ver detalles
          </Button>
        </LinkContainer>
        <Button
          variant="danger"
          onClick={handleRemove}
          style={{ fontSize: "0.875rem", marginLeft: "10px" }}
        >
          Eliminar
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default PodItemComponent;
