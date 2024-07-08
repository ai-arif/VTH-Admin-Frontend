import axiosInstance from "../../utils/axiosInstance";

export const getIncomingTest = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/patient-registration/incoming?page=${page}&limit=${limit}`);
    // const response = await axiosInstance.get(`/prescription/lab/test?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// get single incoming test
export const getSingleIncomingTest = async (id) => {
  try {
    const response = await axiosInstance.get(`/patient-registration/incoming/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteIncomingTest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/test/test-result/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// search user with search query parameter
export const searchIncomingTest = async ({ search, page = 1, limit = 40 }) => {
  try {
    const response = await axiosInstance.get(`/patient-registration/search?search=${search}&page=${page}&limit=${limit}`);
    // const response = await axiosInstance.get(`/prescription/search/by?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// get all test results
export const getTestResult = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/test/test-result/?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
// get single test result
export const getSingleTestResult = async (id) => {
  try {
    const response = await axiosInstance.get(`/test/test-result/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
