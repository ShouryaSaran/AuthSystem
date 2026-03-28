import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://authsystem-production-b97f.up.railway.app/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const getErrorMessage = (error) => {
  if (error?.response?.data?.details?.length) {
    return error.response.data.details.map((detail) => detail.message).join(" ");
  }

  return error?.response?.data?.message || "Request failed. Please try again.";
};

export async function getTasks() {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createTask(payload) {
  try {
    const response = await api.post("/tasks", payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateTask(id, payload) {
  try {
    const response = await api.patch(`/tasks/${id}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteTask(id) {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
