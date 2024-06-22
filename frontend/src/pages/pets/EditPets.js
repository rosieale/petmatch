import {
    Row,
    Col,
    Container,
    Form,
    Button,
    Alert,
  } from "react-bootstrap";
  import { useNavigate, useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { getPetById, updatePet } from '../../services/petServices';
  
  const EditPets = () => {
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [type, setType] = useState('');
    const [owner, setOwner] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchPet = async () => {
        try {
          const pet = await getPetById(id);
          setName(pet.name);
          setAge(pet.age);
          setType(pet.type);
          setOwner(pet.owner);
        } catch (error) {
          setError('Error al obtener los datos de la mascota');
        }
      };
  
      fetchPet();
    }, [id]);
  
    const handleGoBack = () => {
      navigate(-1);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        try {
          const petData = { name, age, type, owner };
          await updatePet(id, petData);
          setSuccess('Mascota actualizada exitosamente');
          setError('');
        } catch (error) {
          console.error('Error al actualizar la mascota:', error);
          setError('Error al actualizar la mascota');
          setSuccess('');
        }
      }
      setValidated(true);
    };
  
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={1}>
            <Button onClick={handleGoBack} className="btn btn-info my-3">
              Ir atrás
            </Button>
          </Col>
          <Col md={6}>
            <h1>Editar mascota para adopción</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  name="age"
                  required
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicType">
                <Form.Label>Especie</Form.Label>
                <Form.Control
                  name="type"
                  required
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicOwner">
                <Form.Label>Propietario</Form.Label>
                <Form.Control
                  name="owner"
                  required
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </Form.Group>
  
              <Button variant="primary" type="submit">
                Actualizar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default EditPets;
  