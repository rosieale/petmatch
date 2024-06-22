import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Alert, Pagination } from "react-bootstrap";
import { getResources } from "../../services/resourceServices";

const ResourcesPage = () => {
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10}>
          <h1 className="text-center">Lista de Recursos</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((item, idx) => (
                <tr key={idx}>
                  <td>{(currentPage - 1) * 10 + idx + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-center">
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
    </Container>
  );
};

export default ResourcesPage;
