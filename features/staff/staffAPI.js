import axiosInstance from "../../utils/axiosInstance";

export const getStaffs = async () => {
  try {
    const response = await axiosInstance.get("/staffs/admins");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateStaffs = async (data) => {
  try {
    const response = await axiosInstance.put("/staffs", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllStaffs = async () => {
  try {
    const response = await axiosInstance.get("/staffs/admins");
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
