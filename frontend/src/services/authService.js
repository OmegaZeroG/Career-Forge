import { apiCall } from "./api";

export const registerUser = (data) => {
    return apiCall("/auth/register", "POST", data);
};

export const loginUser = (data) => {
    return apiCall("/auth/login", "POST", data);
};

export const getMe = (token) => {
    return apiCall("/auth/me", "GET", null, token);
};