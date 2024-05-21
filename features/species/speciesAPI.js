import axiosInstance from "../../utils/axiosInstance";

export const getSpecies = async () => {
  try {
    const response = await axiosInstance.get("/species");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addSpecies = async (species) => {
  try {
    const response = await axiosInstance.post("/species", species);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSpecies = async (species) => {
  try {
    const response = await axiosInstance.put(`/species/${species.id}`, species);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteSpecies = async (id) => {
  try {
    const response = await axiosInstance.delete(`/species/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchSpecies = async (search, page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(`/species/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
