import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://api-test-web.agiletech.vn/",
});

// Function to refresh the token
const refreshToken = async () => {
  try {
    const response = await api.post(
      "https://api-test-web.agiletech.vn/auth/refresh-token",
      {
        refreshToken: localStorage.getItem("refresh_token")?.toString(),
      }
    );
    localStorage.setItem("access_token", response.data.accessToken);
    localStorage.setItem("refresh_token", response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    // Handle token refresh errors
    console.error("Failed to refresh token", error);
    return null;
  }
};

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    // If the error is due to an expired token
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      !request._retry
    ) {
      request._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        // Update the Authorization header with the new token
        request.headers["Authorization"] = `Bearer ${newToken}`;
        return api(request);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
