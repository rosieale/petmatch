import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig"; // Usar axiosInstance para agregar token en la solicitud

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
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
    password: "",
    confirmPassword: "",
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/api/users/profile");
        setUserData({
          ...data,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUserData({ ...userData, [name]: files[0] });
  };

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Las contraseñas no son iguales");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      setError("");
      setSuccess("");

      const { password, confirmPassword, ...updatedUserData } = userData;

      if (password && password !== confirmPassword) {
        setLoading(false);
        setError("Las contraseñas no son iguales");
        return;
      }

      const formData = new FormData();
      for (const key in updatedUserData) {
        formData.append(key, updatedUserData[key]);
      }

      try {
        const { data } = await axiosInstance.patch(
          "/api/users/profile",
          formData
        );
        setLoading(false);
        setSuccess("Perfil actualizado exitosamente");
        setUserData({
          ...data,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        setLoading(false);
        setError("No se pudo actualizar el perfil");
      }
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h2>Cambiar perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="info">{success}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Tu nombre</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese su nombre
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Dirección de correo</Form.Label>
              <Form.Control disabled value={userData.email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Número de teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={userData.country}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSpaceAvailable">
              <Form.Label>Espacio disponible para la mascota</Form.Label>
              <Form.Control
                type="text"
                name="spaceAvailable"
                value={userData.spaceAvailable}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicPsychologicalReference"
            >
              <Form.Label>Referencia psicológica</Form.Label>
              <Form.Control
                type="text"
                name="psychologicalReference"
                value={userData.psychologicalReference}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEconomicStatus">
              <Form.Label>Estatus económico</Form.Label>
              <Form.Control
                as="select"
                name="economicStatus"
                value={userData.economicStatus}
                onChange={handleInputChange}
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
                name="numberOfPets"
                value={userData.numberOfPets}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicExperienceWithPets"
            >
              <Form.Label>Experiencia previa con mascotas</Form.Label>
              <Form.Control
                type="text"
                name="experienceWithPets"
                value={userData.experienceWithPets}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMotivation">
              <Form.Label>Motivación para adoptar</Form.Label>
              <Form.Control
                type="text"
                name="motivation"
                value={userData.motivation}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIdPhoto">
              <Form.Label>Foto de identificación</Form.Label>
              <Form.Control
                type="file"
                name="idPhoto"
                onChange={handleFileChange}
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cambiar contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Contraseña"
                minLength={6}
                value={userData.password}
                onChange={handleInputChange}
                onBlur={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa una contraseña válida
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                La contraseña debe tener un mínimo de 6 caracteres
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repite la contraseña</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Repite la contraseña"
                minLength={6}
                value={userData.confirmPassword}
                onChange={handleInputChange}
                onBlur={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Ambas contraseñas deben ser iguales
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Actualizar"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
