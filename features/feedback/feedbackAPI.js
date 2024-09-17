import axiosInstance from "../../utils/axiosInstance";

export const getFeedbacks = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/feedback?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addFeedback = async (feedback) => {
  try {
    const response = await axiosInstance.post("/feedback", feedback);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateFeedback = async (feedback) => {
  try {
    const response = await axiosInstance.put(`/feedback/${feedback.id}`, feedback);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteFeedback = async (id) => {
  try {
    const response = await axiosInstance.delete(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
