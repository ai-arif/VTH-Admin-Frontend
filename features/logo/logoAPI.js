import axiosInstance from "../../utils/axiosInstance";

export const getLogos = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/logo?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addLogo = async (logo) => {
  try {
    const response = await axiosInstance.post("/logo", logo);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateLogo = async (logo) => {
  try {
    const response = await axiosInstance.put(`/logo/${logo.id}`, logo);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteLogo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/logo/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
