import axiosInstance from "../../utils/axiosInstance";
// /admin-user
export const getAllUserPatient = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/admin-user?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// search user with search query parameter
export const searchUserPatient = async (search, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/admin-user/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
