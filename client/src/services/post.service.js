import api from "../api/api";

export const getAllPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (formData) => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const toggleLike = async (postId) => {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data;
};

export const getPostsByUser = async (username) => {
  const response = await api.get(`/posts/user/${username}`);
  return response.data;
};

export const updatePost = async (postId, formData) => {
  const response = await api.patch(`/posts/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

export const toggleSave = async (postId) => {
  const response = await api.post(`/posts/${postId}/save`);
  return response.data;
};
export const getSavedPosts = async () => {
  const response = await api.get("/posts/saved");
  return response.data;
};
