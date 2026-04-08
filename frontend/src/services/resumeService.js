import { apiCall } from "./api";

export const uploadResume = (file, token) => {
    const formData = new FormData();
    formData.append("resume", file); // MUST MATCH BACKEND

    return apiCall("/resume/upload", "POST", formData, token, true);
};

export const getMyResumes = (token) => {
    return apiCall("/resume/my", "GET", null, token);
};

export const deleteResume = (id, token) => {
    return apiCall(`/resume/${id}`, "DELETE", null, token);
};