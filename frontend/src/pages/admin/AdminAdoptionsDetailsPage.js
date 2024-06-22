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

const AdminAdoptionsDetailsPage = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Detalles de adopción</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Entrega</h2>
              <b>Nombre</b>: Adriana Cerna <br />
              <b>Dirección</b>: Residencial Villas, Bloque 6 Casa 27 <br />
              <b>Número</b>: 9876-4613
            </Col>
            <Col md={6}>
              <h2>Método de envío</h2>
              <Form.Select disabled={false}>
                <option value="pp">Entrega en casa</option>
                <option value="cod">Lugar común</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  No completado
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Completado en...
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
                    backgroundColor: "#ff69b4",
                    borderColor: "#ff69b4",
                    color: "white",
                  }}
                >
                  Marcar como completado
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAdoptionsDetailsPage;
