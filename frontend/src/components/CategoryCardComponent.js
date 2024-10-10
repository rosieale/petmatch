import { Button, Card } from "react-bootstrap";

const CategoryCardComponent = ({ category, idx, onClick }) => {
  const images = [
    "/images/Puppy1.png",
    "/images/Kitties1.png",
    "/images/Animals1.png",
    "/images/Kitties1.png",
  ];

  const buttonText = {
    Caninos: "Ver perros en adopción",
    Felinos: "Ver gatos en adopción",
    Recursos: "Ir a Recursos",
    Test: "Test",
  };

  return (
    <Card>
      <Card.Img
        crossOrigin="anonymous"
        variant="top"
        src={images[idx]}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Text>
          Entra aquí para ver todas las mascotas que están buscando un hogar.
        </Card.Text>
        <Button variant="primary" onClick={onClick}>
          {buttonText[category]}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
