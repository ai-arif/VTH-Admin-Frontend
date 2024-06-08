import axiosInstance from "../../utils/axiosInstance";

export const getMedicine = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/medicine?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
// get single medicine
export const getSingleMedicine = async (id) => {
  try {
    const response = await axiosInstance.get(`/medicine/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addMedicine = async (medicine) => {
  try {
    const response = await axiosInstance.post("/medicine", medicine);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateMedicine = async (medicine) => {
  try {
    const response = await axiosInstance.put(`/medicine/${medicine.id}`, medicine);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteMedicine = async (id) => {
  try {
    const response = await axiosInstance.delete(`/medicine/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchMedicine = async ({ search, page = 1, limit = 40 }) => {
  try {
    const response = await axiosInstance.get(`/medicine/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
