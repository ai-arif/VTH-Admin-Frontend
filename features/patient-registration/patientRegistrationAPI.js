import axiosInstance from "../../utils/axiosInstance";

export const registerPatient = async (patientData) => {
    try {
        const response = await axiosInstance.post("/patient", patientData);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };

export const getPatient = async () => {
    try {
        const response = await axiosInstance.get("/patient");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getSinglePatient = async (id) => {
    try {
        const response = await axiosInstance.get(`/patient/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updatePatient = async (patient) => {
    try {
        const response = await axiosInstance.put(`/patient/${patient.id}`, patient);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deletePatient = async (id) => {
    try {
        const response = await axiosInstance.delete(`/patient/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
