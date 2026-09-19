import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------------------------------------------
// REQUEST INTERCEPTOR (Axios v1 safe)
// --------------------------------------------------------


axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      return config;
    }
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// --------------------------------------------------------
// RESPONSE INTERCEPTOR
// --------------------------------------------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const status = error?.response?.status;

    // if (status === 401 || status === 403) {
    //   Cookies.remove("accessToken");
    //   if (typeof window !== "undefined") {
    //     window.location.href = "/auth/login";
    //   }
    // }

    return Promise.reject(error);
  },
);

export default axiosInstance;
