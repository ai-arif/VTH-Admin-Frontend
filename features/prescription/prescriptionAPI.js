import axiosInstance from "../../utils/axiosInstance";

export const getPrescriptions = async (page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/prescription?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSinglePrescription = async (id) => {
  try {
    const response = await axiosInstance.get(`/prescription/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPrescription = async (prescription) => {
  try {
    const response = await axiosInstance.post("/prescription", prescription);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePrescription = async (prescription) => {
  try {
    const response = await axiosInstance.put(`/prescription/${prescription.id}`, prescription);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePrescription = async (id) => {
  try {
    const response = await axiosInstance.delete(`/prescription/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchPrescription = async (search, page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/prescription/search/by?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
