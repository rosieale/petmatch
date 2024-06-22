import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetCarouselComponent from "../components/user/PetsCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const Homepage = () => {
  const categories = ["Caninos", "Felinos", "Recursos"];
  const navigate = useNavigate();

  useEffect(() => {
    const registrationSuccess = localStorage.getItem("registrationSuccess");
    const petAdded = localStorage.getItem("petAdded");

    if (registrationSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario registrado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("registrationSuccess");
    }

    if (petAdded) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Agregaste la mascota con éxito!",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("petAdded");
    }
  }, []);

  const handleCategoryClick = (category) => {
    if (category === "Caninos") {
      navigate("/pets?type=Canino");
    } else if (category === "Felinos") {
      navigate("/pets?type=Felino");
    } else if (category === "Recursos") {
      navigate("/resources");
    }
  };

  return (
    <>
      <PetCarouselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {categories.map((category, idx) => (
            <CategoryCardComponent
              key={idx}
              category={category}
              idx={idx}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
