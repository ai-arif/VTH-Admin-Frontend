import axiosInstance from "../../utils/axiosInstance";

export const getPatient = async (page = 1, limit = 15) => {
  try {
    const response = await axiosInstance.get(`/patient-registration?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerPatient = async (patientData) => {
  try {
    const response = await axiosInstance.post("/patient-registration", patientData);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSinglePatient = async (id) => {
  try {
    const response = await axiosInstance.get(`/patient-registration/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePatient = async (patient) => {
  try {
    const response = await axiosInstance.put(`/patient-registration/${patient.id}`, patient);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await axiosInstance.delete(`/patient-registration/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// search?search=&page&limit
export const searchPatient = async (search, page = 1, limit = 40) => {
  try {
    const response = await axiosInstance.get(`/patient-registration/search?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
