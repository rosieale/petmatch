import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddPetForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [owner, setOwner] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("type", type);
    formData.append("owner", owner);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/pets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading pet:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el nombre de la mascota"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formAge">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingresa la edad de la mascota"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formType">
        <Form.Label>Tipo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el tipo de mascota"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formOwner">
        <Form.Label>Dueño</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el nombre del dueño"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formImage">
        <Form.Label>Imagen</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Añadir Mascota
      </Button>
    </Form>
  );
};

export default AddPetForm;
