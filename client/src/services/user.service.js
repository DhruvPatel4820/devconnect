import api from "../api/api";

export const getUserProfile = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const searchUsers = async (keyword) => {
  const response = await api.get(
    `/users/search?keyword=${encodeURIComponent(keyword)}`,
  );
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/users/profile", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.patch("/users/change-password", data);
  return response.data;
};

export const updateAvatar = async (formData) => {
  const response = await api.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getSuggestedUsers = async () => {
  const response = await api.get("/users/suggestions");
  return response.data;
};
