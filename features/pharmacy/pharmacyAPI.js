import axiosInstance from "../../utils/axiosInstance";

export const getPharmacy = async () => {
  try {
    const response = await axiosInstance.get("/pharmacy");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSinglePharmacy = async (id) => {
  try {
    const response = await axiosInstance.get(`/pharmacy/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPharmacy = async (pharmacy) => {
  try {
    const response = await axiosInstance.post("/pharmacy", pharmacy);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePharmacy = async (pharmacy) => {
  try {
    const response = await axiosInstance.put(`/pharmacy/${pharmacy.id}`, pharmacy);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePharmacy = async (id) => {
  try {
    const response = await axiosInstance.delete(`/pharmacy/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchPharmacy = async (search, page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(`/pharmacy/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
