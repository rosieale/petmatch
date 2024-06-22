import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Container, ListGroup, Image, Alert } from "react-bootstrap";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults?.pets || [];

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Resultados de la búsqueda</h1>
          {searchResults.length > 0 ? (
            <ListGroup>
              {searchResults.map((pet, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={4}>
                      <Image src={pet.imageUrl} thumbnail />
                    </Col>
                    <Col md={8}>
                      <h2>{pet.name}</h2>
                      <p>
                        <strong>Ubicación:</strong> {pet.location}
                      </p>
                      <p>
                        <strong>Tipo:</strong> {pet.type}
                      </p>
                      <p>
                        <strong>Descripción:</strong> {pet.description}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info">No se encontraron resultados</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResultsPage;
