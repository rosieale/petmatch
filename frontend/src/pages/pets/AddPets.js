import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig"; // Asegúrate de que la ruta es correcta

const AddPets = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [specialCare, setSpecialCare] = useState(false);
  const [specialCareDetails, setSpecialCareDetails] = useState("");
  const [spaceRequirement, setSpaceRequirement] = useState("Ambos");
  const [attentionRequirement, setAttentionRequirement] = useState("Medio");
  const [strength, setStrength] = useState("Regular");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("type", type);
    formData.append("owner", owner);
    formData.append("location", location);
    formData.append("image", image);
    formData.append("specialCare", specialCare);
    if (specialCare) {
      formData.append("specialCareDetails", specialCareDetails);
    }
    formData.append("spaceRequirement", spaceRequirement);
    formData.append("attentionRequirement", attentionRequirement);
    formData.append("strength", strength);

    try {
      const response = await axiosInstance.post("/api/pets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Mascota agregada con éxito!");
      setError("");
      localStorage.setItem("petAdded", "true");
      navigate("/");
    } catch (error) {
      setError("Error agregando mascota");
      setSuccess("");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3>Agregar Mascota</h3>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la mascota"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Edad de la mascota"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Selecciona el tipo</option>
                <option value="Canino">Canino</option>
                <option value="Felino">Felino</option>
                <option value="Otros">Otros</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="owner">
              <Form.Label>Dueño</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del dueño"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ubicación de la mascota"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

            <h4>Necesidades de la Mascota</h4>
            <Form.Group className="mb-3" controlId="specialCare">
              <Form.Check
                type="checkbox"
                label="¿Necesita cuidado especial?"
                checked={specialCare}
                onChange={(e) => setSpecialCare(e.target.checked)}
              />
            </Form.Group>

            {specialCare && (
              <Form.Group className="mb-3" controlId="specialCareDetails">
                <Form.Label>Detalles del cuidado especial</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describa el cuidado especial necesario"
                  value={specialCareDetails}
                  onChange={(e) => setSpecialCareDetails(e.target.value)}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="spaceRequirement">
              <Form.Label>¿Espacio necesario?</Form.Label>
              <Form.Control
                as="select"
                value={spaceRequirement}
                onChange={(e) => setSpaceRequirement(e.target.value)}
                required
              >
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
                <option value="Ambos">Ambos</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="attentionRequirement">
              <Form.Label>¿Nivel de atención necesaria?</Form.Label>
              <Form.Control
                as="select"
                value={attentionRequirement}
                onChange={(e) => setAttentionRequirement(e.target.value)}
                required
              >
                <option value="Poco">Poco</option>
                <option value="Medio">Medio</option>
                <option value="Bastante">Bastante</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="strength">
              <Form.Label>¿Tiene mucha fuerza?</Form.Label>
              <Form.Control
                as="select"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                required
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
                <option value="Regular">Regular</option>
              </Form.Control>
            </Form.Group>

            <Button className="mt-3 mb-3" variant="primary" type="submit">
              Agregar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPets;
