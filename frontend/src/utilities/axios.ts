import React from "react";
import axios from "axios";

import { authApi } from "@/api";

const axiosInstance = axios.create();

export function setupAxiosInterceptor(
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        !axios.isAxiosError(error) ||
        !error.response ||
        ![401].includes(error.response.status)
      ) {
        return Promise.reject(error);
      }

      try {
        const res = await authApi.refreshToken();
        console.log(res);
        const data = res.data;
        axios.defaults.headers.common.Authorization = `Bearer ${data}`;
        setAccessToken(data);

        const originalRequest = error.config;

        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${data}`;
          return axios(originalRequest);
        } else {
          return Promise.reject(error);
        }
      } catch (refreshError) {
        setAccessToken(undefined);
        return Promise.reject(refreshError);
      }
    },
  );
}
export default axiosInstance;
