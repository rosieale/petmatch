import { useEffect, useState } from "react";
import { Row, Col, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { getAllAdoptions } from "../../services/adoptionServices";

const AdminAdoptionsPage = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const data = await getAllAdoptions();
        console.log("Fetched Adoptions:", data);
        setAdoptions(data);
      } catch (error) {
        setError("Error al obtener las adopciones");
      }
    };

    fetchAdoptions();
  }, []);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Adopciones</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Mascota</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((adoption, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{adoption.user.username}</td>
                <td>{new Date(adoption.createdAt).toLocaleDateString()}</td>
                <td>{adoption.pet.name}</td>
                <td>{adoption.pet.fueAdoptado ? "Adoptado" : "Disponible"}</td>
                <td>
                  <Link to={`/admin/AdminAdoptionsDetailsPage/${adoption._id}`}>
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

export default AdminAdoptionsPage;
