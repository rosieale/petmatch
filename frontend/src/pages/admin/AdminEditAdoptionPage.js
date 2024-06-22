import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
    Image
  } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import { useState } from "react";
  
  const onHover = {
      cursor: "pointer",
      position: "absolute",
      left: "5px",
      top: "-10px",
      transform: "scale(2.7)",
  }
  
  const AdminEditAdoptionPage = () => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={1}>
            <Link to="/admin/AdminPetsPage" className="btn btn-info my-3">
              Ir atrás
            </Link>
          </Col>
          <Col md={6}>
            <h1>Editar listado de adopción</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="name" required type="text" defaultValue="Melly" />
              </Form.Group>
  
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="description"
                  required
                  as="textarea"
                  rows={3}
                  defaultValue="Descripción de mascota"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCount">
                <Form.Label>Ubicación</Form.Label>
                <Form.Control name="price" required type="text" defaultValue="San Pedro Sula" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Especie</Form.Label>
                <Form.Control name="price" required type="text" defaultValue="Felino" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>
                  Especie
                  
                </Form.Label>
                <Form.Select
                  required
                  name="category"
                  aria-label="Seleccionar"
                >
                  <option value="">Elegir especie</option>
                  <option value="1">Perro</option>
                  <option value="2">Gato</option>
                  <option value="3">Ave</option>
                  <option value="4">Otros</option>
                </Form.Select>
              </Form.Group>
  
  
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                    >
                      <option>Choose attribute</option>
                      <option value="red">color</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
  
              <Row>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>attr key</td>
                      <td>attr value</td>
                      <td>
                        <CloseButton />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                    <Form.Label>Create new attribute</Form.Label>
                    <Form.Control
                      disabled={false}
                      placeholder="first choose or create category"
                      name="newAttrValue"
                      type="text"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicNewAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Control
                      disabled={false}
                      placeholder="first choose or create category"
                      required={true}
                      name="newAttrValue"
                      type="text"
                    />
                  </Form.Group>
                </Col>
              </Row>
  
              <Alert variant="primary">
                After typing attribute key and value press enterr on one of the
                field
              </Alert>
  
              <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                <Form.Label>Imágenes</Form.Label>
                  <Row>
                      <Col style={{position: "relative"}} xs={3}>
                      <Image src="/images/Cat1.png" fluid />
                      <i style={onHover} className="bi bi-x text-danger"></i>
                      </Col>
                      <Col style={{position: "relative"}} xs={3}>
                      <Image src="/images/Cat2.png" fluid />
                      <i style={onHover} className="bi bi-x text-danger"></i>
                      </Col>
                      
                  </Row>
                <Form.Control required type="file" multiple />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default AdminEditAdoptionPage;
  
  