import axiosInstance from "../../utils/axiosInstance";

export const getComplaint = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/complaint?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addComplaint = async (complaint) => {
  try {
    const response = await axiosInstance.post("/complaint", complaint);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateComplaint = async (complaint) => {
  try {
    const response = await axiosInstance.put(`/complaint/${complaint.id}`, complaint);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteComplaint = async (id) => {
  try {
    const response = await axiosInstance.delete(`/complaint/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const searchComplaint = async ({ search, page = 1, limit = 40 }) => {
//   try {
//     const response = await axiosInstance.get(`/complaint/search?search=${search}&page=${page}&limit=${limit}`);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
