import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import PodItemComponent from "../../components/PodItemComponent";

const UserPetPodDetailsPage = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Detalles del Pod</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Entrega</h2>
              <b>Nombre</b>: Adriana Cerna <br />
              <b>Dirección</b>: Residencial Villas, Bloque 1 <br />
              <b>Número</b>: 9667 8546
            </Col>
            <Col md={6}>
              <h2>Método de entrega</h2>
              <Form.Select>
                <option value="pp">Entrega en lugar común</option>
                <option value="cod">Entrega en casa</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  No completado aun
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Mascota</h2>
          <ListGroup variant="flush">
            {Array.from({ length: 1 }).map((item, idx) => (
              <PodItemComponent key={idx} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Resumen</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Ubicación: <span className="fw-bold">San Pedro Sula</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Entrega: <span className="fw-bold">incluída</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  type="button"
                  style={{
                    backgroundColor: "pink",
                    borderColor: "pink",
                    color: "white",
                  }}
                >
                  Marcar adopción como completada
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPetPodDetailsPage;
