import { Row, Col, Container, Image, ListGroup, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetById } from "../services/petServices";
import { addToPod } from "../services/podServices";
import { useUserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const PetDetailsPage = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(id);
        setPet(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPet();
  }, [id]);

  const handleAddToPod = async () => {
    if (!user) {
      navigate("/LoginPage");
      return;
    }

    if (!user.isVerified) {
      Swal.fire(
        "Error",
        "Tienes que esperar a ser verificado por un Admin antes de poder adoptar.",
        "error"
      );
      return;
    }

    try {
      await addToPod(pet._id);
      navigate("/user/UserPetPodPage");
    } catch (error) {
      Swal.fire(
        "Error",
        "Hubo un problema al agregar la mascota al pod.",
        "error"
      );
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>{pet.imageUrl && <Image src={pet.imageUrl} fluid />}</Col>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{pet.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Ubicación:</strong> {pet.location}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Tipo:</strong> {pet.type}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Descripción:</strong> {pet.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Estado:</strong>{" "}
              {pet.fueAdoptado ? "Adoptado" : "Disponible"}
            </ListGroup.Item>
          </ListGroup>
          <Button variant="info" className="mt-3" onClick={handleAddToPod}>
            Agregar al pod de mascotas
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PetDetailsPage;
