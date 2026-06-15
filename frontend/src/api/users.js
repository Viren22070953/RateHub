import API from "./axios";

export const getDashboardStats = () => API.get("/admin/dashboard");

export const getUsers = (params) => API.get("/admin/users", { params });

export const getUserById = (id) => API.get(`/admin/users/${id}`);

export const addUser = (payload) => API.post("/admin/users", payload);

export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

export const updatePassword = (payload) => API.put("/users/password", payload);
