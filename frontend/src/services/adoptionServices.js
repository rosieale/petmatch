import axiosInstance from "../config/axiosConfig";

export const getUserAdoptions = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/adoptions/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo adopciones del usuario", error);
    throw error;
  }
};

export const getAllAdoptions = async () => {
  try {
    const response = await axiosInstance.get("/api/adoptions");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo todas las adopciones", error);
    throw error;
  }
};

export const createAdoption = async (userId, petId) => {
  try {
    const response = await axiosInstance.post("/api/adoptions", {
      userId,
      petId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creando la adopción", error);
    throw error;
  }
};
