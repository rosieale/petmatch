import axiosInstance from "../config/axiosConfig";

export const addToPod = async (petId) => {
  try {
    const response = await axiosInstance.post(`/api/pod/add`, { petId });
    return response.data;
  } catch (error) {
    console.error("Error adding pet to pod", error);
    throw error;
  }
};

export const getPod = async () => {
  try {
    const response = await axiosInstance.get(`/api/pod`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pod", error);
    throw error;
  }
};

export const removeFromPod = async (petId) => {
  try {
    const response = await axiosInstance.post(`/api/pod/remove`, { petId });
    return response.data;
  } catch (error) {
    console.error("Error removing pet from pod", error);
    throw error;
  }
};
