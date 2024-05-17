import axiosInstance from "../../utils/axiosInstance";

export const getStaffs = async () => {
  try {
    const response = await axiosInstance.get("/staffs/admins");
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

export const searchStaff = async (search) => {
  try {
    const response = await axiosInstance.get(`/staffs/search?search=${search}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
