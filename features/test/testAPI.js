import axiosInstance from "../../utils/axiosInstance";

export const getTest = async () => {
  try {
    const response = await axiosInstance.get("/test");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addTest = async (test) => {
  try {
    const response = await axiosInstance.post("/test", test);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
