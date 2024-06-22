import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
    return (
    <footer className="footer">
    <Container fluid>
      <Row>
        <Col className="text-white text-center py-3">Todos los derechos reservados © PetMatch</Col>
      </Row>
    </Container>
    </footer>
  );
}

export default FooterComponent;
