import axios from "axios";

const api = axios.create({
  // During development we proxy requests to the Express backend running on port 5000.
  // In production, you can configure VITE_API_BASE_URL to your API domain.
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
});

export default api; 