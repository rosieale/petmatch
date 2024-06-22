import { useEffect, useState } from "react";
import { Row, Col, Table, Button, Alert, Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { getResources, deleteResource } from "../../services/resourceServices";

const AdminResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchResources(currentPage);
  }, [currentPage]);

  const fetchResources = async (page) => {
    try {
      const data = await getResources(page);
      setResources(data.resources);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Error al obtener la lista de recursos");
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteResource(id);
        const newPage =
          resources.length === 1 && currentPage > 1
            ? currentPage - 1
            : currentPage;
        fetchResources(newPage);
        setCurrentPage(newPage);
      } catch (error) {
        setError("Error al eliminar el recurso");
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
          Lista de Recursos{" "}
          <LinkContainer to="/resources/add">
            <Button variant="primary" size="lg">
              Crear nuevo
            </Button>
          </LinkContainer>
        </h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>URL</th>
              <th>Editar/Borrar</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((item, idx) => (
              <tr key={idx}>
                <td>{(currentPage - 1) * 10 + idx + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.url}</td>
                <td>
                  <LinkContainer to={`/resources/edit/${item._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
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

export default AdminResourcesPage;
