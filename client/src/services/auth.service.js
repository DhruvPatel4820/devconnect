import api from "../api/api";

export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
// console.log(response)
// console.log("after responce")
// console.log(response.data)
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};


export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};