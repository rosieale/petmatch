import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PetCarouselComponent = () => {
  const cursorP = {
    cursor: "pointer",
  };
  return (
    <Carousel>
      <Carousel.Item>
        <img
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "400px", objectFit: "cover" }}
          src="/images/carousel/Pets2.png"
          alt="Primer slide"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/pets">
            <h3>Adopta al nuevo integrante de tu familia</h3>
          </LinkContainer>
          <p>Navega las mascotas disponibles para adopción</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "400px", objectFit: "cover" }}
          src="/images/carousel/Pets3.png"
          alt="Segundo slide"
        />

        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/resources">
            <h3>Lee recursos o noticias de mascotas</h3>
          </LinkContainer>
          <p>Aumenta tu conocimiento.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "400px", objectFit: "cover" }}
          src="/images/carousel/Pets4.png"
          alt="Tercer slide"
        />
        <Carousel.Caption>
          <LinkContainer
            to={{ pathname: "/pets", search: "?type=Felino" }}
            style={cursorP}
          >
            <h3>¿Quieres un acompañante más independiente?</h3>
          </LinkContainer>
          <p>Considera adoptar un gato.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default PetCarouselComponent;
