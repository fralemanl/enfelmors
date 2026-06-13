import axios from "axios";

const RAW_BASE = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");
const ABSOLUTE_BASE = /^https?:\/\//i.test(RAW_BASE)
  ? RAW_BASE
  : RAW_BASE
    ? `https://${RAW_BASE}`
    : "";
const BASE_WITHOUT_API = ABSOLUTE_BASE.endsWith("/api")
  ? ABSOLUTE_BASE.slice(0, -4)
  : ABSOLUTE_BASE;
const API_BASE_URL = BASE_WITHOUT_API ? `${BASE_WITHOUT_API}/api` : "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Users
export const registerUser = (userData) => api.post("/users/register", userData);
export const loginUser = (credentials) => api.post("/users/login", credentials);
export const getUsers = () => api.get("/users");
export const updateUser = (userId, userData) =>
  api.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);
export const resetUserPassword = (userId, password) =>
  api.post(`/users/${userId}/reset_password`, {password});
export const forgotPassword = (email) =>
  api.post("/forgot-password", {email});
export const confirmResetPassword = (token, password) =>
  api.post(`/reset-password/${token}`, {password});
export const generateResetLink = (userId) =>
  api.post(`/generate-reset-link/${userId}`);

// Matches
export const getMatches = () => api.get("/matches");
export const getMatch = (id) => api.get(`/matches/${id}`);
export const createMatch = (matchData) => api.post("/matches", matchData);
export const updateMatch = (id, matchData) =>
  api.put(`/matches/${id}`, matchData);
export const deleteMatch = (id) => api.delete(`/matches/${id}`);

// Predictions
export const createPrediction = (userId, predictionData) =>
  api.post(`/predictions?user_id=${userId}`, predictionData);
export const getUserPredictions = (userId) =>
  api.get(`/predictions/user/${userId}`);
export const getMatchPredictions = (matchId) =>
  api.get(`/predictions/match/${matchId}`);

// Leaderboard
export const getLeaderboard = () => api.get("/leaderboard");

// Reset all (admin)
export const resetAll = (adminUserId) =>
  api.post(`/reset_all?admin_user_id=${adminUserId}`);

// Reset points only (admin)
export const resetPoints = (adminUserId) =>
  api.post(`/reset_points?admin_user_id=${adminUserId}`);

// Champion Prediction
export const getChampionPrediction = (userId) => api.get(`/champion/${userId}`);

// Export
export const exportPredictions = () => api.get("/export/predictions");

export default api;
