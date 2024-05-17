import axiosInstance from "../../utils/axiosInstance";

export const getMedicine = async () => {
  try {
    const response = await axiosInstance.get("/medicine");
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

// /medicine/search?search=Hasan&page=1&limit=10
export const searchMedicine = async (search,page=1,limit=20) => {
  try {
    const response = await axiosInstance.get(`/medicine/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
