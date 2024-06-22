import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  ListGroup,
  Button,
  Alert,
  Form,
  Pagination,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PetForListComponent from "../components/PetForListComponent";
import { searchPets } from "../services/petServices";

const PetListPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page") || 1, 10);
    const type = params.get("type") || "";
    const locationFilter = params.get("location") || "";

    setCurrentPage(page);
    setTypeFilter(type);
    setLocationFilter(locationFilter);
  }, [location.search]);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const query = {
          page: currentPage,
          type: typeFilter,
          location: locationFilter,
        };
        const data = await searchPets(query);
        setPets(data.pets || []); // Asegurarse de que pets sea siempre una lista
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        setError("Error al obtener la lista de mascotas");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [currentPage, typeFilter, locationFilter]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate({
      pathname: "/pets",
      search: `?page=${pageNumber}&type=${typeFilter}&location=${locationFilter}`,
    });
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
    navigate({
      pathname: "/pets",
      search: `?page=1&type=${typeFilter}&location=${locationFilter}`,
    });
  };

  const handleFilterReset = () => {
    setTypeFilter("");
    setLocationFilter("");
    navigate({
      pathname: "/pets",
      search: `?page=1&type=&location=`,
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <h5>Filtrar por Tipo</h5>
              <Form.Control
                as="select"
                value={typeFilter}
                onChange={handleFilterChange(setTypeFilter)}
              >
                <option value="">Todos</option>
                <option value="Canino">Canino/Perro</option>
                <option value="Felino">Felino/Gato</option>
              </Form.Control>
            </ListGroup.Item>
            <ListGroup.Item className="mb-3">
              <h5>Filtrar por Ubicación</h5>
              <Form.Control
                as="select"
                value={locationFilter}
                onChange={handleFilterChange(setLocationFilter)}
              >
                <option value="">Todas</option>
                <option value="San Pedro Sula">San Pedro Sula</option>
                <option value="Ceiba">Ceiba</option>
                <option value="Tegucigalpa">Tegucigalpa</option>
                <option value="Copán">Copán</option>
              </Form.Control>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="danger" onClick={handleFilterReset}>
                Reiniciar Filtros
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {pets.length === 0 ? (
            <Alert variant="warning">No se encontraron mascotas</Alert>
          ) : (
            pets.map((pet) => <PetForListComponent key={pet._id} pet={pet} />)
          )}
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

export default PetListPage;
