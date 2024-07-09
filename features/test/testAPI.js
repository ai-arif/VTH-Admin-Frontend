import axiosInstance from "../../utils/axiosInstance";

export const getAllSubParameter = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/parameter/all/sub`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSubParameter = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/parameter/sub/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTest = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/test/get?page=${page}&limit=${limit}`);
    // const response = await axiosInstance.get(`/test?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// get single test
export const getSingleTest = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/get/${id}`);
    // const response = await axiosInstance.get(`/test/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// /test/search?search=a&page=1&limit=10 , take search, page, limit as query params
export const searchTest = async ({ search, page = 1, limit = 40 }) => {
  try {
    const response = await axiosInstance.get(`/test/search?search=${search}&page=${page}&limit=${limit}`);
    // const response = await axiosInstance.get(`/test/get/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addTest = async (test) => {
  try {
    const response = await axiosInstance.post("/test/get", test);
    // const response = await axiosInstance.post("/test", test);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTest = async (test) => {
  try {
    const response = await axiosInstance.put(`/test/get/${test.id}`, test);
    // const response = await axiosInstance.put(`/test/${test.id}`, test);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/test/get/${id}`);
    // const response = await axiosInstance.delete(`/test/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

//test parameter
export const getParameter = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/parameter/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addTestParameter = async (data) => {
  try {
    const response = await axiosInstance.post("/test/parameter", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTestParameter = async (test) => {
  try {
    const response = await axiosInstance.put(`/test/parameter/${test.id}`, test);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteParameter = async (id) => {
  try {
    const response = await axiosInstance.delete(`/parameter/${id}`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// sub params
export const updateTestSubParameter = async (test) => {
  try {
    const response = await axiosInstance.put(`/test/parameter/sub/${test.id}`, test);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// additional fields
export const getAllAdditionalFields = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/parameter/additional/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addAdditionalField = async (data) => {
  try {
    const response = await axiosInstance.post("/test/parameter/additional", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTestAdditionalField = async (test) => {
  try {
    const response = await axiosInstance.put(`/test/parameter/additional/${test.id}`, test);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// get test all info including sub and additional fields
export const getTestAllFields = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/full-test/${id}`);
    // console.log(response)
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
