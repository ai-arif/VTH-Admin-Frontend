import axiosInstance from "../../utils/axiosInstance";

export const getUser = async () => {
    try {
        const response = await axiosInstance.get("/user");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    }
export const updateUser = async (data) => {
    try {
        const response = await axiosInstance.put("/user", data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    }