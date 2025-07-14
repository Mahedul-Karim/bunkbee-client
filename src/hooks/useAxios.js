import { BASE_URL } from "@/lib/constants";
import { useStore } from "@/store/Provider";
import axios from "axios";
import React, { useEffect } from "react";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: (status) => status < 510,
  withCredentials: true,
});

export const useAxios = () => {
  const { token } = useStore();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [token]);

  return {
    axiosInstance,
  };
};
