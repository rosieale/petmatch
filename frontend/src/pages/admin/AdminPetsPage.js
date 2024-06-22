import { useEffect, useState } from "react";
import { Row, Col, Table, Button, Alert, Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { getPets, deletePet } from "../../services/petServices";

const AdminPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPets(currentPage);
  }, [currentPage]);

  const fetchPets = async (page) => {
    try {
      const data = await getPets(page);
      setPets(data.pets);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError('Error al obtener la lista de mascotas');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deletePet(id);
        const newPage = pets.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
        fetchPets(newPage);
        setCurrentPage(newPage);
      } catch (error) {
        setError('Error al eliminar la mascota');
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
        <h1>
          Lista de Mascotas{" "}
          <LinkContainer to="/pets/add">
            <Button variant="primary" size="lg">
              Crear nueva
            </Button>
          </LinkContainer>
        </h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de Mascota</th>
              <th>Ubicación</th>
              <th>Tipo</th>
              <th>Editar/Borrar</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((item, idx) => (
              <tr key={idx}>
                <td>{(currentPage - 1) * 10 + idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.type}</td>
                <td>
                  <LinkContainer to={`/pets/edit/${item._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(item._id)}>
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {[...Array(totalPages).keys()].map(number => (
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

export default AdminPetsPage;
