import axiosInstance from "../../utils/axiosInstance";

export const getStaffs = async (page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/staffs/admins?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateStaff = async (data) => {
  try {
    const response = await axiosInstance.put(`/staffs/update-admin/${data.id}`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteStaff = async (id) => {
  try {
    const response = await axiosInstance.delete(`/staffs/delete-admin/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addStaff = async (data) => {
  try {
    const response = await axiosInstance.post("/staffs/create-staff", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchStaff = async (search, page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/staffs/admins/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
