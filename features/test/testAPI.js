import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const getTest = async () => {
  try {
    const response = await axiosInstance.get("/test");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
