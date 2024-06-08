import axiosInstance from "../../utils/axiosInstance";

export const getDepartments = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/department?page=${page}&limit=${limit}`);
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

export const searchDepartment = async ({ search, page = 1, limit = 40 }) => {
  try {
    const response = await axiosInstance.get(`/department/search/by?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
