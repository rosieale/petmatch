import { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../services/userServices";
import axiosInstance from "../../config/axiosConfig";

const AdminEditUserPage = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [age, setAge] = useState("");
  const [spaceAvailable, setSpaceAvailable] = useState("");
  const [psychologicalReference, setPsychologicalReference] = useState("");
  const [economicStatus, setEconomicStatus] = useState("");
  const [numberOfPets, setNumberOfPets] = useState("");
  const [experienceWithPets, setExperienceWithPets] = useState("");
  const [motivation, setMotivation] = useState("");
  const [idPhoto, setIdPhoto] = useState(null);
  const [workProof, setWorkProof] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(id);
        setUsername(user.username || "");
        setLastName(user.lastName || "");
        setEmail(user.email || "");
        setIsAdmin(user.isAdmin || false);
        setAge(user.age || "");
        setSpaceAvailable(user.spaceAvailable || "");
        setPsychologicalReference(user.psychologicalReference || "");
        setEconomicStatus(user.economicStatus || "");
        setNumberOfPets(user.numberOfPets || "");
        setExperienceWithPets(user.experienceWithPets || "");
        setMotivation(user.motivation || "");
        setIdPhoto(user.idPhoto || null);
        setWorkProof(user.workProof || null);
      } catch (error) {
        setError("Error al cargar los datos del usuario");
      }
    };

    fetchUser();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "idPhoto") {
      setIdPhoto(files[0]);
    } else if (name === "workProof") {
      setWorkProof(files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("isAdmin", isAdmin);
      formData.append("age", age);
      formData.append("spaceAvailable", spaceAvailable);
      formData.append("psychologicalReference", psychologicalReference);
      formData.append("economicStatus", economicStatus);
      formData.append("numberOfPets", numberOfPets);
      formData.append("experienceWithPets", experienceWithPets);
      formData.append("motivation", motivation);
      if (idPhoto) formData.append("idPhoto", idPhoto);
      if (workProof) formData.append("workProof", workProof);

      try {
        await axiosInstance.patch(`/api/users/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccess("Usuario actualizado correctamente");
      } catch (error) {
        setError("Error al actualizar el usuario");
        setSuccess("");
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
          <h1>Editar usuario</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                name="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSpaceAvailable">
              <Form.Label>Espacio Disponible</Form.Label>
              <Form.Control
                name="spaceAvailable"
                type="text"
                value={spaceAvailable}
                onChange={(e) => setSpaceAvailable(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicPsychologicalReference"
            >
              <Form.Label>Referencia Psicológica</Form.Label>
              <Form.Control
                name="psychologicalReference"
                type="text"
                value={psychologicalReference}
                onChange={(e) => setPsychologicalReference(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEconomicStatus">
              <Form.Label>Estatus Económico</Form.Label>
              <Form.Select
                name="economicStatus"
                value={economicStatus}
                onChange={(e) => setEconomicStatus(e.target.value)}
              >
                <option value="7,000-14,000">7,000-14,000</option>
                <option value="14,000-24,000">14,000-24,000</option>
                <option value="24,000-34,000">24,000-34,000</option>
                <option value="34,000-44,000">34,000-44,000</option>
                <option value="44,000-54,000">44,000-54,000</option>
                <option value="54,000-64,000">54,000-64,000</option>
                <option value="64,000-74,000">64,000-74,000</option>
                <option value="74,000 o más">74,000 o más</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumberOfPets">
              <Form.Label>Número de Mascotas</Form.Label>
              <Form.Control
                name="numberOfPets"
                type="number"
                value={numberOfPets}
                onChange={(e) => setNumberOfPets(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicExperienceWithPets"
            >
              <Form.Label>Experiencia con Mascotas</Form.Label>
              <Form.Control
                name="experienceWithPets"
                type="text"
                value={experienceWithPets}
                onChange={(e) => setExperienceWithPets(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMotivation">
              <Form.Label>Motivación</Form.Label>
              <Form.Control
                name="motivation"
                type="text"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIdPhoto">
              <Form.Label>Foto de ID</Form.Label>
              <Form.Control
                name="idPhoto"
                type="file"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWorkProof">
              <Form.Label>Constancia de Trabajo</Form.Label>
              <Form.Control
                name="workProof"
                type="file"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="isAdmin"
                type="checkbox"
                label="Es administrador"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
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

export default AdminEditUserPage;
