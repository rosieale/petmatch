import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axiosInstance from "../config/axiosConfig";

const RegisterPage = () => {
  const { registerUser, loading } = useUserContext();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    country: "",
    age: "",
    spaceAvailable: "",
    psychologicalReference: "",
    economicStatus: "",
    numberOfPets: "",
    experienceWithPets: "",
    motivation: "",
    idPhoto: null,
    workProof: null,
  });
  const [error, setError] = useState(false);

  const isMounted = useRef(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError(true);
        return;
      }

      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      const result = await registerUser(formDataObj);
      if (!result) {
        setError(true);
      } else {
        setError(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario registrado exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Registrarse</h1>
          {error && <Alert variant="danger">Ocurrió un error</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa un nombre de usuario válido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Ingresa el correo"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo válido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Contraseña"
                minLength={6}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 6 caracteres
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repite la contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Repite la contraseña"
                minLength={6}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Ambas contraseñas deben ser iguales
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu dirección"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu país"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>

            <h3>Datos de Verificación para Adopción</h3>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu edad"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSpaceAvailable">
              <Form.Label>Espacio disponible para la mascota</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. Casa con jardín"
                name="spaceAvailable"
                value={formData.spaceAvailable}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicPsychologicalReference"
            >
              <Form.Label>Referencia psicológica</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu referencia psicológica"
                name="psychologicalReference"
                value={formData.psychologicalReference}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEconomicStatus">
              <Form.Label>Estatus económico</Form.Label>
              <Form.Control
                as="select"
                name="economicStatus"
                value={formData.economicStatus}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un rango</option>
                <option value="7,000-14,000">7,000-14,000 HND</option>
                <option value="14,000-24,000">14,000-24,000 HND</option>
                <option value="24,000-34,000">24,000-34,000 HND</option>
                <option value="34,000-44,000">34,000-44,000 HND</option>
                <option value="44,000-54,000">44,000-54,000 HND</option>
                <option value="54,000-64,000">54,000-64,000 HND</option>
                <option value="64,000-74,000">64,000-74,000 HND</option>
                <option value="74,000 o más">74,000 o más HND</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumberOfPets">
              <Form.Label>Número de mascotas actualmente en casa</Form.Label>
              <Form.Control
                type="number"
                placeholder="Número de mascotas"
                name="numberOfPets"
                value={formData.numberOfPets}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicExperienceWithPets"
            >
              <Form.Label>Experiencia previa con mascotas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu experiencia"
                name="experienceWithPets"
                value={formData.experienceWithPets}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMotivation">
              <Form.Label>Motivación para adoptar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu motivación para adoptar"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIdPhoto">
              <Form.Label>Foto de identificación</Form.Label>
              <Form.Control
                type="file"
                name="idPhoto"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWorkProof">
              <Form.Label>Constancia de trabajo (opcional)</Form.Label>
              <Form.Control
                type="file"
                name="workProof"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Registrarse"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
