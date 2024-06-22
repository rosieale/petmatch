import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Alert, Modal } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import axiosInstance from "../../config/axiosConfig";

const AdminVerifyUserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/api/users/verification-applications"
        );
        setUsers(data);
      } catch (error) {
        setError("Error al obtener las aplicaciones de verificación");
      }
    };

    fetchUsers();
  }, []);

  const handleVerify = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleConfirmVerification = async () => {
    try {
      await axiosInstance.post(
        `/api/users/confirm-verification/${selectedUser._id}`
      );
      setError("");
      setShowDetails(false);
      // Actualizar la lista de usuarios después de la verificación
      const { data } = await axiosInstance.get(
        "/api/users/verification-applications"
      );
      setUsers(data);
    } catch (error) {
      setError("Error confirmando la verificación");
    }
  };

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Verificar Usuarios para Adopción</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.country}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleVerify(user._id)}
                  >
                    Verificar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {selectedUser && (
          <Modal show={showDetails} onHide={() => setShowDetails(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Detalles de Verificación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Nombre:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Correo:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {selectedUser.phone}
              </p>
              <p>
                <strong>Dirección:</strong> {selectedUser.address}
              </p>
              <p>
                <strong>Edad:</strong> {selectedUser.age}
              </p>
              <p>
                <strong>Espacio disponible:</strong>{" "}
                {selectedUser.spaceAvailable}
              </p>
              <p>
                <strong>Referencia psicológica:</strong>{" "}
                {selectedUser.psychologicalReference}
              </p>
              <p>
                <strong>Estatus económico:</strong>{" "}
                {selectedUser.economicStatus}
              </p>
              <p>
                <strong>Número de mascotas:</strong> {selectedUser.numberOfPets}
              </p>
              <p>
                <strong>Experiencia con mascotas:</strong>{" "}
                {selectedUser.experienceWithPets}
              </p>
              <p>
                <strong>Motivación:</strong> {selectedUser.motivation}
              </p>
              {selectedUser.idPhoto && (
                <p>
                  <strong>Foto de ID:</strong>{" "}
                  <a
                    href={selectedUser.idPhoto}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar
                  </a>
                </p>
              )}
              {selectedUser.workProof && (
                <p>
                  <strong>Constancia de Trabajo:</strong>{" "}
                  <a
                    href={selectedUser.workProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar
                  </a>
                </p>
              )}
              <Button variant="success" onClick={handleConfirmVerification}>
                Confirmar Verificación
              </Button>
            </Modal.Body>
          </Modal>
        )}
      </Col>
    </Row>
  );
};

export default AdminVerifyUserPage;
