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
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { loginUser, loading } = useUserContext();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      setError(false); // Limpia el estado al desmontar el componente
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const result = await loginUser(email, password, rememberMe);
      if (!result) {
        setError(true);
      } else {
        setError(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Iniciaste sesión correctamente!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Inicia sesión</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Dirección de correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa el correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                isInvalid={error}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo válido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                isInvalid={error}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese una contraseña válida
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="No cerrar sesión"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </Form.Group>
            <Row className="pb-2">
              <Col>
                No tienes una cuenta?
                <Link to="/RegisterPage"> Registrate </Link>
              </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Inicia sesión"
              )}
            </Button>
            {error && (
              <Alert show={true} variant="danger">
                Credenciales incorrectas
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
