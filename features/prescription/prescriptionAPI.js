import axiosInstance from "../../utils/axiosInstance";

export const getPrescriptions = async () => {
  try {
    const response = await axiosInstance.get("/prescription");
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

export const searchPrescription = async (search) => {
  try {
    const response = await axiosInstance.get(`/prescription/search?search=${search}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
