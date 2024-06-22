import { useEffect, useState } from "react";
import { Row, Col, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserAdoptions } from "../../services/adoptionServices";
import { useUserContext } from "../../context/UserContext";

const UserAdoptionsPage = () => {
  const { user } = useUserContext();
  const [adoptions, setAdoptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const data = await getUserAdoptions(user._id);
        setAdoptions(data);
      } catch (error) {
        setError("Error al obtener las adopciones");
      }
    };

    if (user) {
      fetchAdoptions();
    }
  }, [user]);

  return (
    <Row className="m-5">
      <Col md={12}>
        <h2>Mis Adopciones</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Mascota</th>
              <th>Fecha</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((adoption, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{adoption.pet.name}</td>
                <td>{new Date(adoption.createdAt).toLocaleDateString()}</td>
                <td>{adoption.pet.location}</td>
                <td>{adoption.pet.fueAdoptado ? "Adoptado" : "Disponible"}</td>
                <td>
                  <Link to={`/user/userAdoptionDetailsPage/${adoption._id}`}>
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserAdoptionsPage;
