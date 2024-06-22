import { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getResourceById,
  updateResource,
} from "../../services/resourceServices";

const EditResourcePage = () => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const resource = await getResourceById(id);
        setTitle(resource.title);
        setDescription(resource.description);
        setUrl(resource.url);
      } catch (error) {
        setError("Error al obtener el recurso");
      }
    };

    fetchResource();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("url", url);
      formData.append("image", image);

      try {
        await updateResource(id, formData);
        setSuccess("Recurso actualizado exitosamente");
        setError("");
        navigate("/resources"); // Redirige a la lista de recursos
      } catch (error) {
        setError("Error al actualizar el recurso");
        setSuccess("");
      }
    }
    setValidated(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Button onClick={() => navigate(-1)} className="btn btn-info my-3">
            Ir atrás
          </Button>
        </Col>
        <Col md={6}>
          <h1>Editar Recurso</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                name="title"
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>URL</Form.Label>
              <Form.Control
                name="url"
                required
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
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

export default EditResourcePage;
