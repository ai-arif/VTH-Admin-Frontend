import axiosInstance from "../../utils/axiosInstance";

export const getContents = async () => {
  try {
    const response = await axiosInstance.get("/content");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addContent = async (content) => {
  try {
    const response = await axiosInstance.post("/content", content);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateContent = async (content) => {
  try {
    const response = await axiosInstance.put(`/content/${content.id}`, content);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteContent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/content/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
