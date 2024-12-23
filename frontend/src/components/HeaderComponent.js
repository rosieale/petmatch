import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { searchPets } from "../services/petServices";

const HeaderComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, logoutUser } = useUserContext();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const searchResults = await searchPets({ q: searchTerm });
      console.log("Resultados de búsqueda:", searchResults);
      navigate("/search", { state: { searchResults } });
    } catch (error) {
      console.error("Error al buscar mascotas", error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary header">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/images/logo2.png"
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="PetMatch Logo"
              style={{ marginRight: "10px" }}
            />
            PetMatch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={<span className="text-white">Menú</span>}
              id="dropdown-item-button "
              className="custom-dropdown-btn text-white"
            >
              <NavDropdown.ItemText>Elije una opción</NavDropdown.ItemText>
              <LinkContainer to="/pets">
                <NavDropdown.Item>Mascotas</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/resources">
                <NavDropdown.Item>Recursos</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Busca mascotas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="custom" onClick={handleSearch}>
                <i className="bi bi-search-heart"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {user ? (
              <>
                {user.isAdmin && (
                  <LinkContainer to="/admin/AdminPetsPage">
                    <Nav.Link>Admin</Nav.Link>
                  </LinkContainer>
                )}
                <NavDropdown
                  title={user.username}
                  id="collapsible-nav-dropdown"
                >
                  <LinkContainer to="/pets/add">
                    <NavDropdown.Item>Agregar mascota</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/resources/add">
                    <NavDropdown.Item>
                      Agregar Publicación o Recurso
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/UserAdoptionsPage">
                    <NavDropdown.Item>Mis adopciones</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/UserProfilePage">
                    <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutUser}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
                <LinkContainer to="/user/UserPetPodPage">
                  <Nav.Link>
                    <i className="bi bi-house-heart-fill"></i> Pod
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/LoginPage">
                  <Nav.Link>Inicia sesión</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/RegisterPage">
                  <Nav.Link>Regístrate</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
