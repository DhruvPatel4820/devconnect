import api from "../api/api";

export const getCommentsByPost = async (postId) => {
  const response = await api.get(`/comments/${postId}`);

  return response.data;
};

export const createComment = async (postId, data) => {
  const response = await api.post(`/comments/${postId}`, data);

  return response.data;
};

export const updateComment = async (commentId, data) => {
  const response = await api.patch(`/comments/${commentId}`, data);

  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);

  return response.data;
};