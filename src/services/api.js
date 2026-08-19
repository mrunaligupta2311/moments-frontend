import { showGlobalNotification } from "./notification";

const API_BASE_URL = "https://moments-backend-meol.onrender.com/api";

export const api = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
   headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  ...(options.headers || {}),
},
  });

  const data = await response.json();

if (!response.ok) {
  const message = data.message || "Something went wrong";


  const error = new Error(message);
  error.userId = data.userId;
  throw error;
}



  return data;
};
