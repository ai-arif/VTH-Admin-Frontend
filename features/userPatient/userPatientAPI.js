import axiosInstance from "../../utils/axiosInstance";
// /admin-user
export const getAllUserPatient = async () => {
    try {
        const response = await axiosInstance.get("/admin-user");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    };

    // search user with search query parameter
export const searchUserPatient = async (search) => {
    try {
        const response = await axiosInstance.get(`/admin-user?search=${search}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
