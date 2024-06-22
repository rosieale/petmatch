import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { getPod, removeFromPod } from "../services/podServices";
import { useUserContext } from "../context/UserContext";
import PodItemComponent from "../components/PodItemComponent";

const PodPage = () => {
  const [podItems, setPodItems] = useState([]);
  const { user } = useUserContext();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPod = async () => {
      try {
        const data = await getPod();
        setPodItems(data);
      } catch (error) {
        setError("Error al obtener el pod de mascotas");
      }
    };

    if (user) {
      fetchPod();
    }
  }, [user]);

  const handleRemove = async (petId) => {
    try {
      await removeFromPod(petId);
      setPodItems(podItems.filter((item) => item._id !== petId));
    } catch (error) {
      setError("Error al eliminar la mascota del pod");
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1 style={{ fontSize: "1.75rem" }}>Pod de Mascotas</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {podItems.length > 0 ? (
            <ListGroup variant="flush">
              {podItems.map((item, idx) => (
                <PodItemComponent
                  key={idx}
                  id={item._id}
                  name={item.name}
                  breed={item.breed}
                  location={item.location}
                  image={item.imageUrl}
                  onRemove={handleRemove}
                />
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info">No hay nada aquí</Alert>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Adoptante ({podItems.length})</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Ubicación:{" "}
              <span className="fw-bold">
                {podItems.length > 0 ? podItems[0].location : "Desconocido"}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default PodPage;
