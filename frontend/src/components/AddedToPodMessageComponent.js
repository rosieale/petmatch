import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddedToPodMessageComponent = () => {
  const [show, setShow] = useState(true);
  return (
    <Alert
      show={show}
      variant="success"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Estás interesado en adoptar a Fae!</Alert.Heading>
      <p>
        <Button variant="success">Ir atrás</Button>{" "}
        <Link to="/user/UserPetPodPage">
          <Button variant="danger">Ir al pod de mascotas</Button>
        </Link>
      </p>
    </Alert>
  );
};

export default AddedToPodMessageComponent;

