import axiosInstance from "../../utils/axiosInstance";

export const getSubParameter = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/parameter/sub/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};



export const getParameter = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/parameter/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};


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

export const updateTest = async (test) => {
  try {
    const response = await axiosInstance.put("/test", test);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/test/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};


export const addParameter = async (data) => {
  try {
    const response = await axiosInstance.post("/parameter", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
