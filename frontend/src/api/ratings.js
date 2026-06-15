import API from "./axios";

export const submitRating = (payload) => API.post("/ratings", payload);

export const updateRating = (ratingId, payload) => API.put(`/ratings/${ratingId}`, payload);

export const getOwnerDashboard = () => API.get("/owner/dashboard");
