import { useEffect, useState } from "react";
import { Row, Col, Table, Button, Alert, Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { getUsers, deleteUser } from "../../services/userServices";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const data = await getUsers(page);
      if (data && data.users && data.totalPages) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } else {
        setUsers([]);
        setTotalPages(1);
        setError("Error al obtener la lista de usuarios");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error al obtener la lista de usuarios");
      setUsers([]);
      setTotalPages(1);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUser(id);
        const newPage =
          users.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
        fetchUsers(newPage);
        setCurrentPage(newPage);
      } catch (error) {
        setError("Error al eliminar el usuario");
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Lista de usuarios</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de Usuario</th>
              <th>Correo</th>
              <th>Es Admin</th>
              <th>Es Verificado</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{(currentPage - 1) * 10 + idx + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <i
                      className={
                        user.isAdmin
                          ? "bi bi-check-lg text-success"
                          : "bi bi-x-lg text-danger"
                      }
                    ></i>
                  </td>
                  <td>
                    <i
                      className={
                        user.isVerified
                          ? "bi bi-check-lg text-success"
                          : "bi bi-x-lg text-danger"
                      }
                    ></i>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/users/edit/${user._id}`}>
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron usuarios</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination>
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Col>
    </Row>
  );
};

export default AdminUsersPage;
