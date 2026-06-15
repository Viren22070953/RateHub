import API from "./axios";

export const getAdminStores = (params) => API.get("/admin/stores", { params });

export const getUserStores = (params) => API.get("/stores", { params });

export const addStore = (payload) => API.post("/admin/stores", payload);

export const deleteStore = (id) => API.delete(`/admin/stores/${id}`);
