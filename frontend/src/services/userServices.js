import axiosInstance from "../config/axiosConfig";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registrando usuario", error);
    throw error;
  }
};

export const getUsers = async (page, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/api/users?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/api/users/${id}`);
  } catch (error) {
    console.error("Error eliminando usuario", error);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    const response = await axiosInstance.patch(`/api/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error actualizando usuario", error);
    throw error;
  }
};
