import axiosInstance from "../../utils/axiosInstance";

export const getBreed = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/breed?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addBreed = async (breed) => {
  try {
    const response = await axiosInstance.post("/breed", breed);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBreed = async (breed) => {
  try {
    const response = await axiosInstance.put(`/breed/${breed.id}`, breed);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBreed = async (id) => {
  try {
    const response = await axiosInstance.delete(`/breed/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const searchBreed = async ({ search, page = 1, limit = 40 }) => {
//   try {
//     const response = await axiosInstance.get(`/breed/search?search=${search}&page=${page}&limit=${limit}`);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
