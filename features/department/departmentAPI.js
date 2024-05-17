import axiosInstance from "../../utils/axiosInstance";

export const getDepartments = async () => {
  try {
    const response = await axiosInstance.get("/department");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addDepartment = async (department) => {
  try {
    const response = await axiosInstance.post("/department", department);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateDepartment = async (department) => {
  try {
    const response = await axiosInstance.put(`/department/${department.id}`, department);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/department/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchDepartment = async (search) => {
  try {
    const response = await axiosInstance.get(`/department/search?search=${search}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
