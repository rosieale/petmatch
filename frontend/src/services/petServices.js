import axiosInstance from "../config/axiosConfig";
import Swal from "sweetalert2";

export const getPets = async (page) => {
  try {
    const response = await axiosInstance.get(`/api/pets?page=${page}&limit=10`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo mascotas", error);
    throw error;
  }
};

export const getPetById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo la mascota", error);
    throw error;
  }
};

export const postPets = async (petData) => {
  try {
    const response = await axiosInstance.post("/api/pets", petData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar la mascota", error);
    throw error;
  }
};

export const updatePet = async (id, petData) => {
  try {
    const response = await axiosInstance.put(`/api/pets/edit/${id}`, petData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando la mascota", error);
    throw error;
  }
};

export const deletePet = async (id) => {
  try {
    await axiosInstance.delete(`/api/pets/${id}`);
  } catch (error) {
    console.error("Error eliminando la mascota", error);
    throw error;
  }
};

export const markAdoptionAsCompleted = async (id, fueAdoptado) => {
  try {
    const response = await axiosInstance.put(`/api/pets/${id}/complete`, {
      fueAdoptado,
    });
    return response.data;
  } catch (error) {
    console.error("Error al marcar la adopción como completada", error);
    throw error;
  }
};

export const addToPod = async (petId) => {
  try {
    const podResponse = await axiosInstance.get("/api/pod");
    const podItems = podResponse.data;

    if (podItems.some((item) => item._id === petId)) {
      Swal.fire("Ya tienes esta mascota en tu pod. :)");
      return;
    }

    const response = await axiosInstance.post(`/api/pod/add`, { petId });
    return response.data;
  } catch (error) {
    console.error("Error adding pet to pod", error);
    throw error;
  }
};

export const searchPets = async ({ q, type, location, page = 1 }) => {
  try {
    let queryString = `/api/pets/search?q=${q || ""}&page=${page}`;
    if (type) queryString += `&type=${type}`;
    if (location) queryString += `&location=${location}`;
    const response = await axiosInstance.get(queryString);
    return response.data;
  } catch (error) {
    console.error("Error al buscar mascotas", error);
    throw error;
  }
};

export const uploadAdoptionImage = async (id, imageData) => {
  try {
    const response = await axiosInstance.post(
      `/api/pets/${id}/upload-adoption-image`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al subir la imagen de adopción", error);
    throw error;
  }
};

export const rateAdoption = async (id, rating) => {
  try {
    const response = await axiosInstance.post(`/api/pets/${id}/rate-adoption`, {
      rating,
    });
    return response.data;
  } catch (error) {
    console.error("Error al clasificar la adopción", error);
    throw error;
  }
};
