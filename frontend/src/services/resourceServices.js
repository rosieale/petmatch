import axiosInstance from "../config/axiosConfig";

export const addResource = async (resourceData) => {
  try {
    const response = await axiosInstance.post("/api/resources", resourceData);
    return response.data;
  } catch (error) {
    console.error("Error agregando recurso", error);
    throw error;
  }
};

export const getResources = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/api/resources?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo recursos", error);
    throw error;
  }
};

export const getResourceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo recurso", error);
    throw error;
  }
};

export const updateResource = async (id, resourceData) => {
  try {
    const response = await axiosInstance.put(
      `/api/resources/${id}`,
      resourceData
    );
    return response.data;
  } catch (error) {
    console.error("Error actualizando recurso", error);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    await axiosInstance.delete(`/api/resources/${id}`);
  } catch (error) {
    console.error("Error eliminando recurso", error);
    throw error;
  }
};
