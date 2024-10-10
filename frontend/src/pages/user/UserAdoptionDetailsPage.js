import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Alert,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  getPetById,
  markAdoptionAsCompleted,
  uploadAdoptionImage,
  rateAdoption,
} from "../../services/petServices";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Rating } from "react-simple-star-rating";

const UserAdoptionDetailsPage = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    let isMounted = true;
    const fetchPet = async () => {
      try {
        const data = await getPetById(id);
        if (isMounted) {
          setPet(data);
          setRating(data.rating);
        }
      } catch (error) {
        if (isMounted) {
          setError("Error obteniendo detalles de la mascota");
        }
      }
    };

    fetchPet();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCompleteAdoption = async () => {
    if (!pet) return;

    const adoptionStatus = pet.fueAdoptado ? "incompleta" : "completada";
    const adoptionMessage = pet.fueAdoptado
      ? "Vas a marcar esta adopción como incompleta."
      : "Vas a marcar esta adopción como completada de tu parte y el dueño.";

    MySwal.fire({
      title: "¿Estás seguro?",
      text: adoptionMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar estado!",
      cancelButtonText: "No, cancelar!",
      confirmButtonColor: "#ff69b4",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedPet = await markAdoptionAsCompleted(
            pet._id,
            !pet.fueAdoptado
          );
          const successMessage = "Actualizaste el estado de adopción";

          Swal.fire(
            updatedPet.fueAdoptado
              ? "Adopción completada"
              : "Adopción incompleta",
            successMessage,
            "success"
          );
          setPet(updatedPet);
        } catch (error) {
          console.error("Error al marcar la adopción como completada", error);
          Swal.fire(
            "Error",
            "Hubo un problema al cambiar el estado de la adopción.",
            "error"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelado",
          "El estado de la adopción no ha sido cambiado",
          "error"
        );
      }
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);
      const updatedPet = await uploadAdoptionImage(pet._id, formData);
      setPet(updatedPet);
      setImage(null);
      Swal.fire("Éxito", "Imagen subida exitosamente", "success");
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al subir la imagen", "error");
    }
  };

  const handleRating = async (rate) => {
    setRating(rate);
    try {
      const updatedPet = await rateAdoption(pet._id, rate);
      setPet(updatedPet);
      Swal.fire("Éxito", "Clasificación guardada exitosamente", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        "Hubo un problema al guardar la clasificación",
        "error"
      );
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Detalles de adopción</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Entrega</h2>
              {user ? (
                <>
                  <b>Nombre</b>: {user.username} <br />
                  <b>Dirección</b>: {user.address} <br />
                  <b>Número</b>: {user.phone}
                </>
              ) : (
                <Alert variant="danger">
                  Información del usuario no disponible
                </Alert>
              )}
            </Col>

            <Row>
              <Col>
                <Alert className="mt-3" variant="success">
                  Estado: {pet.fueAdoptado ? "Adoptado" : "Disponible"}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Ubicación: {pet.location}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Mascota</h2>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col md={4}>
                  <Image src={pet.imageUrl} fluid />
                </Col>
                <Col md={8}>
                  <h3>{pet.name}</h3>
                  <p>
                    <b>Tipo:</b> {pet.type}
                  </p>
                  <p>
                    <b>Descripción:</b> {pet.description}
                  </p>
                  <p>
                    <b>Ubicación:</b> {pet.location}
                  </p>
                  <p>
                    <b>¿Necesita cuidado especial?:</b>{" "}
                    {pet.specialCare ? "Sí" : "No"}
                  </p>
                  {pet.specialCare && (
                    <p>
                      <b>Detalles del cuidado especial:</b>{" "}
                      {pet.specialCareDetails}
                    </p>
                  )}
                  <p>
                    <b>Espacio necesario:</b> {pet.spaceRequirement}
                  </p>
                  <p>
                    <b>Nivel de atención necesaria:</b>{" "}
                    {pet.attentionRequirement}
                  </p>
                  <p>
                    <b>¿Tiene mucha fuerza?:</b> {pet.strength}
                  </p>

                  {/* Mostrar carnet de vacunas con borde rosado */}
                  {pet.vaccineCardUrl && (
                    <p>
                      <b>Carnet de vacunas:</b>{" "}
                      <Image
                        src={pet.vaccineCardUrl}
                        fluid
                        style={{
                          border: "2px solid #ff69b4", // Borde rosado
                          borderRadius: "8px", // Esquinas redondeadas
                          padding: "5px", // Espacio alrededor de la imagen
                        }}
                      />
                    </p>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Resumen</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Mascota: <span className="fw-bold">{pet.name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Ubicación: <span className="fw-bold">{pet.location}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant={pet.fueAdoptado ? "success" : "danger"}
                  type="button"
                  onClick={handleCompleteAdoption}
                >
                  {pet.fueAdoptado
                    ? "Adoptaste esta mascota"
                    : "Marcar adopción como completada"}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
          {pet.fueAdoptado && (
            <>
              <h4 className="mt-4">
                Sube imágenes de la mascota en su nuevo hogar
              </h4>
              <Form onSubmit={handleImageUpload}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Subir Imagen
                </Button>
              </Form>
              {pet.adoptionImages.length > 0 && (
                <>
                  <h3 className="mt-4">Imágenes del nuevo hogar</h3>
                  {pet.adoptionImages.map((img, idx) => (
                    <Image key={idx} src={img} fluid className="mb-3" />
                  ))}
                </>
              )}
              <h4 className="mt-4">Clasificación del adoptador</h4>
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                size={20}
                label
                transition
                fillColor="orange"
                emptyColor="gray"
                className="foo" // Will remove the inline style if applied
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserAdoptionDetailsPage;
