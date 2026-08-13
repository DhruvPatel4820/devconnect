import api from "../api/api";

export const toggleFollow = async (userId) => {
  const response = await api.post(`/follows/${userId}`);

  return response.data;
};