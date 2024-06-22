import React, { useEffect, useState } from "react";
import { getResources } from "../../services/resourceServices";
import { Container, Row, Col, Card } from "react-bootstrap";

const ResourceListComponent = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data.resources); // Asegúrate de que estás estableciendo los recursos correctamente
      } catch (error) {
        setError("Error al obtener recursos");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!resources || resources.length === 0) {
    return <div>No se encontraron recursos</div>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        {resources.map((resource) => (
          <Col key={resource._id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={resource.imageUrl} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{resource.title}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
                <Card.Link href={resource.url} className="mt-auto">
                  Leer más
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ResourceListComponent;
