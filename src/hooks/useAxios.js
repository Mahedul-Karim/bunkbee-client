import { BASE_URL } from "@/lib/constants";
import { useStore } from "@/store/Provider";
import axios from "axios";
import React from "react";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: (status) => status < 510,
  withCredentials:true
});

export const useAxios = () => {
  const { token } = useStore();

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return {
    axiosInstance,
  };
};
