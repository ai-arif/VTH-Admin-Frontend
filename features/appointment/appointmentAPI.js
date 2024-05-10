import axiosInstance from "../../utils/axiosInstance";

export const getAppointments = async () => {
    try {
        const response = await axiosInstance.get("/appointment");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };

export const addAppointment = async (appointment) => {
    try {
        const response = await axiosInstance.post("/appointment", appointment);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };

export const updateAppointment = async (appointment) => {
    try {
        const response = await axiosInstance.put(`/appointment/${appointment.id}`, appointment);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };

export const deleteAppointment = async (id) => {
    try {
        const response = await axiosInstance.delete(`/appointment/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };

    // get appointments by id
export const getAppointmentById = async (id) => {
    try {
        const response = await axiosInstance.get(`/appointment/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };
    // /phone/:phone
    // get appointment list by phone
export const getAppointmentsByPhone = async (phone) => {
    try {
        const response = await axiosInstance.get(`/appointment/phone/${phone}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };



