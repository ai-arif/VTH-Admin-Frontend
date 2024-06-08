import axiosInstance from "../../utils/axiosInstance";

export const getApprovedAppointments = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/appointment/approved?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPendingAppointments = async ({ page = 1, limit = 15 }) => {
  try {
    const response = await axiosInstance.get(`/appointment/pending?page=${page}&limit=${limit}`);
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

export const searchApprovedAppointments = async ({ search, page = 1, limit = 40, status = "approved" }) => {
  try {
    const response = await axiosInstance.get(`/appointment?search=${search}&page=${page}&limit=${limit}&status=${status}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const searchPendingAppointments = async ({ search, page = 1, limit = 40, status = "pending" }) => {
  try {
    const response = await axiosInstance.get(`/appointment?search=${search}&page=${page}&limit=${limit}&status=${status}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
