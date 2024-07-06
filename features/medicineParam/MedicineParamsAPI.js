import axiosInstance from "../../utils/axiosInstance";

export const getMedicineParams = async () => {
  try {
    const response = await axiosInstance.get("/medicine-params");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addMedicineParam = async (medicineParams) => {
  try {
    const response = await axiosInstance.post("/medicine-params", medicineParams);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatedMedicineParam = async (medicineParams) => {
  try {
    const response = await axiosInstance.put(`/medicine-params/${medicineParams.id}`, medicineParams);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteMedicineParam = async (id) => {
  try {
    const response = await axiosInstance.delete(`/medicine-params/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
